import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { diagnosesId, userId }: { diagnosesId: string[]; userId: string } =
        req.body;

      try {
        const updatedData = await prisma.usersDiagnoseHistory.updateMany({
          where: {
            id: {
              in: diagnosesId,
            },
          },
          data: {
            userId,
          },
        });

        const getUpdatedData = await prisma.usersDiagnoseHistory.findMany({
          where: {
            id: {
              in: diagnosesId,
            },
          },
          include: {
            pestsAndDeseases: true,
          },
        });

        if (updatedData.count === 0) {
          res.status(404).json({
            code: 404,
            message: "Riwayat diagnosa tidak ditemukan",
          });
          return;
        }

        res.status(200).json({
          code: 200,
          message: "Berhasil menyimpan riwayat diagnosa sebelumnya",
          data: getUpdatedData,
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Gagal menyimpan riwayat diagnosa sebelumnya",
        });
        // throw new Error(error);
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}
