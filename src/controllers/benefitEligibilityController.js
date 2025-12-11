import { findAll, create, findById, update, remove } from '../repositories/benefitEligibilityRepository.js';

export async function getAllBenefitEligibility(req, res) {
    try {
        const allBenefit = await findAll();
        return res.status(200).json(allBenefit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch benefit eligibility" });
    }
}

export async function createBenefitEligibility(req, res) {
    const newBenefit = req.body;

    if (!newBenefit) {
        return res.status(400).json({ error: 'Benefit eligibility data is required' });
    }

    if (!newBenefit.benefit || newBenefit.status === undefined || !newBenefit.user_id) {
        return res.status(400).json({
            error: 'benefit, status, and user_id are required fields'
        });
    }

    try {
        const created = await create(newBenefit);
        return res.status(201).json(created);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create benefit eligibility" });
    }
}

export async function getBenefitEligibilityById(req, res) {
    try {
        const benefitRecord = await findById(req.params.id);
        return res.status(200).json(benefitRecord || null);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch benefit eligibility" });
    }
}

export async function updateBenefitEligibility(req, res) {
    const id = req.params.id;
    const benefitData = req.body;

    try {
        const updated = await update(id, benefitData);
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update benefit eligibility" });
    }
}

export async function deleteBenefitEligibility(req, res) {
    try {
        await remove(req.params.id);
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete benefit eligibility" });
    }
}
