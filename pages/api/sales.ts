import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
  };
  res.status(200).json(salesData);
} 