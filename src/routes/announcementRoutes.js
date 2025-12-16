import { Router } from 'express';
import { 
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement 
} from '../controllers/announcementController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/announcements:
 *   get:
 *     description: Retrieve all announcements.
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: A list of announcements.
 */
router.get('/', verifyToken, getAllAnnouncements);

/**
 * @openapi
 * /api/v1/announcements/{id}:
 *   get:
 *     description: Retrieve a single announcement by ID.
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Announcement fetched successfully.
 */
router.get('/:id', verifyToken, getAnnouncementById);

/**
 * @openapi
 * /api/v1/announcements:
 *   post:
 *     description: Create a new announcement.
 *     tags: [Announcements]
 *     responses:
 *       201:
 *         description: Announcement created successfully.
 */
router.post('/', verifyToken, createAnnouncement);

/**
 * @openapi
 * /api/v1/announcements/{id}:
 *   put:
 *     description: Update an announcement by ID.
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Announcement updated successfully.
 */
router.put('/:id', verifyToken, async (req, res) => {
    await updateAnnouncement(req.params.id, req.body);
    return res.status(200).json({ message: 'Announcement updated successfully' });
});

/**
 * @openapi
 * /api/v1/announcements/{id}:
 *   delete:
 *     description: Delete an announcement by ID.
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Announcement deleted successfully.
 */
router.delete('/:id', verifyToken, deleteAnnouncement);

export default router;
