import { findAllPersons, createPWD, findPersonById, updatePerson, removePerson } from '../repositories/personRepository.js';

export async function getAllPersons(req, res) {
    var allPersons = await findAllPersons();
    res.status(200).json(allPersons);
}

export async function createPerson(req, res) {
    var newPerson = req.body;

    if (!newPerson) {
        return res.status(400).json({ error: 'Person data is required' });
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
            error: 'full_name, date_of_birth, gender, disability_type, address, contact_no, status, and date_registered are required fields'
        });
    }

    await createPWD(newPerson);
    return res.status(201).json({ message: 'Person created successfully' });
}

export async function getPersonById(req, res) {
    var person = await findPersonById(req.params.id);
    return res.status(200).json(person);
}

export async function updatePersonRecord(req, res) {
    var id = req.params.id;
    var updatedData = req.body;

    await updatePerson(id, updatedData);
    return res.status(200).json({ message: 'Person updated successfully' });
}

export async function deletePerson(req, res) {
    await removePerson(req.params.id);
    return res.status(200).json({ message: 'Person deleted successfully' });
}
