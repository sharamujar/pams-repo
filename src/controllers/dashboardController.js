import { getCounts } from "../repositories/dashboardRepository.js";

export async function getDashboardStats(req, res) {
  try {
    const stats = await getCounts();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
}
