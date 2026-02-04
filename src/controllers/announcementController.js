import {
  findAll,
  create,
  findById,
  update,
  remove,
  updateStatus,
  findByStatus,
} from "../repositories/announcementRepository.js";

export async function getAllAnnouncements(req, res) {
  const allAnnouncements = await findAll();
  return res.status(200).json(allAnnouncements);
}

export async function createAnnouncement(req, res) {
  const newAnnouncement = req.body;

  if (!newAnnouncement) {
    return res.status(400).json({ error: "Announcement data is required" });
  }

  if (
    !newAnnouncement.title ||
    !newAnnouncement.content ||
    !newAnnouncement.date_posted
  ) {
    return res.status(400).json({
      error: "title, content, and date_posted are required fields",
    });
  }

  await create(newAnnouncement);
  return res.status(201).json({ message: "Announcement created successfully" });
}

export async function getAnnouncementById(req, res) {
  const announcement = await findById(req.params.id);
  return res.status(200).json(announcement);
}

export async function updateAnnouncement(id, announcementData) {
  await update(id, announcementData);
  return res.status(200).json({ message: "Announcement updated successfully" });
}

export async function deleteAnnouncement(req, res) {
  await remove(req.params.id);
  return res.status(200).json({ message: "Announcement deleted successfully" });
}

export async function updateAnnouncementStatus(req, res) {
  const id = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null) {
    return res.status(400).json({ error: "Status is required" });
  }

  const updated = await updateStatus(id, status);

  if (!updated) {
    return res.status(404).json({ error: "Announcement not found" });
  }

  return res.status(200).json({ message: "Announcement status updated successfully" });
}

export async function getAnnouncementsByStatus(req, res) {
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({ error: "Status query parameter is required" });
  }

  const announcements = await findByStatus(status);
  return res.status(200).json(announcements);
}
