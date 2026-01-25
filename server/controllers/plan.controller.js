import prisma from "../db.js";

export const getPlans = async (req, res) => {
  const plans = await prisma.plan.findMany();
  res.json(plans);
};

