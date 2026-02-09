import {
  findAllPersons,
  createPWD,
  findPersonById,
  updatePerson,
  removePerson,
  findByEmail,
  updatePersonPassword,
} from "../repositories/personRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secretKey = process.env.JWT_SECRET;

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const person = await findByEmail(email);
  if (!person) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, person.password_hash);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { email, oid: person.id, role: "member" },
    secretKey,
    {
      expiresIn: "24h",
    },
  );

  return res.status(200).json({ token });
}

export async function getAllPersons(req, res) {
  const { status } = req.query;
  var allPersons = await findAllPersons(status);
  res.status(200).json(allPersons);
}

export async function createPerson(req, res) {
  var newPerson = req.body;

  if (!newPerson) {
    return res.status(400).json({ error: "Person data is required" });
  }

  if (
    !newPerson.full_name ||
    !newPerson.date_of_birth ||
    !newPerson.gender ||
    !newPerson.disability_type ||
    !newPerson.address ||
    !newPerson.contact_no ||
    !newPerson.status ||
    !newPerson.date_registered
  ) {
    return res.status(400).json({
      error:
        "full_name, date_of_birth, gender, disability_type, address, contact_no, status, and date_registered are required fields",
    });
  }

  newPerson.password_hash = await bcrypt.hash(newPerson.password, 10);
  delete newPerson.password;

  await createPWD(newPerson);
  return res.status(201).json({ message: "Person created successfully" });
}

export async function getPersonById(req, res) {
  var person = await findPersonById(req.params.id);
  return res.status(200).json(person);
}

export async function getCurrentPerson(req, res) {
  const userId = req.user?.oid;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User id not found in authentication context" });
  }

  const person = await findPersonById(userId);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  return res.status(200).json(person);
}

export async function updatePersonRecord(req, res) {
  var id = req.params.id;
  var updatedData = req.body;

  await updatePerson(id, updatedData);
  return res.status(200).json({ message: "Person updated successfully" });
}

export async function updateCurrentPerson(req, res) {
  const userId = req.user?.oid;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User id not found in authentication context" });
  }

  const updatedData = { ...req.body };

  // Never allow clients to override the identifier or password fields
  delete updatedData.id;
  delete updatedData.password;
  delete updatedData.password_hash;

  await updatePerson(userId, updatedData);

  return res.status(200).json({ message: "Person updated successfully" });
}

export async function changeCurrentPersonPassword(req, res) {
  const userId = req.user?.oid;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User id not found in authentication context" });
  }

  const { old_password, new_password, confirm_password } = req.body || {};

  if (!old_password || !new_password || !confirm_password) {
    return res.status(400).json({
      error: "old_password, new_password, and confirm_password are required",
    });
  }

  if (new_password !== confirm_password) {
    return res
      .status(400)
      .json({ error: "New password and confirm password do not match" });
  }

  const person = await findPersonById(userId);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  const isOldPasswordValid = await bcrypt.compare(
    old_password,
    person.password_hash,
  );

  if (!isOldPasswordValid) {
    return res.status(400).json({ error: "Old password is incorrect" });
  }

  const newPasswordHash = await bcrypt.hash(new_password, 10);

  await updatePersonPassword(userId, newPasswordHash);

  return res.status(200).json({ message: "Password changed successfully" });
}

export async function deletePerson(req, res) {
  await removePerson(req.params.id);
  return res.status(200).json({ message: "Person deleted successfully" });
}
