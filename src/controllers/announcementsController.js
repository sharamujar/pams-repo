import { findAll, create, findById, update, remove } from '../repositories/announcementRepository.js';

export async function getAllAnnouncements(req, res) {
    const allAnnouncements = await findAll();
    return res.status(200).json(allAnnouncements);
}

export async function createAnnouncement(req, res) {
    const newAnnouncement = req.body;

    if (!newAnnouncement) {
        return res.status(400).json({ error: 'Announcement data is required' });
    }

    if (!newAnnouncement.title || !newAnnouncement.message || !newAnnouncement.date) {
        return res.status(400).json({ 
            error: 'title, message, and date are required fields' 
        });
    }

    await create(newAnnouncement);
    return res.status(201).json({ message: 'Announcement created successfully' });
}

export async function getAnnouncementById(req, res) {
    const announcement = await findById(req.params.id);
    return res.status(200).json(announcement);
}

export async function updateAnnouncement(id, announcementData) {
    await update(id, announcementData);
    return res.status(200).json({ message: 'Announcement updated successfully' });
}

export async function deleteAnnouncement(req, res) {
    await remove(req.params.id);
    return res.status(200).json({ message: 'Announcement deleted successfully' });
}
