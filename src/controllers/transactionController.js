import { findAll, create, findById, update, remove } from '../repositories/transactionRepository.js';

export async function getAllTransactions(req, res) {
    var allTransactions = await findAll();
    res.status(200).json(allTransactions);
}

export async function createTransaction(req, res) {
    var newTransaction = req.body;

    if (!newTransaction) {
        return res.status(400).json({ error: 'Transaction data is required' });
    }

    // Required fields (based on the transaction dataset)
    if (
        !newTransaction.PWD_ID ||
        !newTransaction.Service_ID ||
        !newTransaction.Date_Given ||
        !newTransaction.Amount_Item ||
        !newTransaction.Staff_In_Charge
    ) {
        return res.status(400).json({
            error: 'PWD_ID, Service_ID, Date_Given, Amount_Item, and Staff_In_Charge are required fields'
        });
    }

    await create(newTransaction);
    return res.status(201);
}

export async function getTransactionById(req, res) {
    var transaction = await findById(req.params.id);
    return res.status(200).json(transaction);
}

export async function updateTransaction(id, transactionData) {
    await update(id, transactionData);
    return res.status(200);
}

export async function deleteTransaction(req, res) {
    await remove(req.params.id);
    return res.status(200);
}
