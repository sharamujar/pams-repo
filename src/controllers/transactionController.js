import {
  findAll,
  create,
  findById,
  update,
  remove,
  findAllByPersonId,
} from "../repositories/transactionRepository.js";

export async function getAllTransactions(req, res) {
  try {
    if (req.query.status) {
      const status = parseInt(req.query.status);
      const filteredTransactions = await findAll({ status: status });
      return res.status(200).json(filteredTransactions);
    }

    const allTransactions = await findAll();
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

export async function getAllMyTransactions(req, res) {
  try {
    if (req.query.status) {
      const status = parseInt(req.query.status);
      const filteredTransactions = await findAllByPersonId(req.user.oid, {
        status: status,
      });
      return res.status(200).json(filteredTransactions);
    }

    const allTransactions = await findAllByPersonId(req.user.oid);
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

export async function createTransaction(req, res) {
  try {
    const newTransaction = req.body;

    if (!newTransaction) {
      return res.status(400).json({ error: "Transaction data is required" });
    }

    newTransaction.person_id = parseInt(req.user.oid);
    newTransaction.status = 1; // Default status to 'pending'

    if (!newTransaction.person_id || !newTransaction.service_id) {
      return res.status(400).json({
        error: "person_id, service_id are required fields",
      });
    }

    await create(newTransaction);
    return res
      .status(201)
      .json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
}

export async function getTransactionById(req, res) {
  try {
    const transaction = await findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
}

export async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    await update(id, data);

    return res
      .status(200)
      .json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    await remove(req.params.id);
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
}
