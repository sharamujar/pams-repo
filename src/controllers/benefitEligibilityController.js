import { findAll, create, findById, update, remove } from '../repositories/benefitEligibilityRepository.js';

export async function getAllBenefitEligibility(req, res) {
    var allBenefit = await findAll();
    res.status(200).json(allBenefit);
}
    
export async function createBenefitEligibility(req, res) {
    var newBenefit = req.body;

    if (!newBenefit) {
        return res.status(400).json({ error: 'Benefit eligibility data is required' });
    }

    
    if (!newBenefit.Benefit || newBenefit.Status === undefined || !newBenefit.Evaluated_By) {
        return res.status(400).json({ 
            error: 'Benefit, Status, and Evaluated_By are required fields' 
        });
    }

    await create(newBenefit);
    return res.status(201);
}

export async function getBenefitEligibilityById(req, res) {
    var benefitRecord = await findById(req.params.id);
    return res.status(200).json(benefitRecord);
}

export async function updateBenefitEligibility(id, benefitData) {
    await update(id, benefitData);
    return res.status(200);
}

export async function deleteBenefitEligibility(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
