import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const {
    name,
    solution,
    activeIngredient,
  }: { name: string; solution: string; activeIngredient: string } = req.body;

  switch (method) {
    case "POST":
      try {
        const createPestOrDesease = await prisma.pestsAndDeseases.create({
          // @ts-ignore
          data: {
            name,
            solution,
            activeIngredient,
          },
        });

        if (!createPestOrDesease) {
          res.status(404).json({
            code: 404,
            message: "Riwayat diagnosis tidak ditemukan",
          });
          return;
        }

        await prisma.$disconnect();
        res.status(200).json({
          code: 200,
          message: "Berhasil menyimpan riwayat diagnosis sebelumnya",
          data: createPestOrDesease,
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Gagal menyimpan riwayat diagnosis sebelumnya",
        });
      }
      break;
    case "PUT":
      try {
        const { pestOrDeseaseCode, data }: any = req.body;
        const updatePestOrDesease = await prisma.pestsAndDeseases.update({
          where: {
            code: parseInt(pestOrDeseaseCode),
          },
          data: {
            name: data.name,
            solution: data.solution,
            activeIngredient: data.activeIngredient,
          },
        });

        if (!updatePestOrDesease) {
          res.status(404).json({
            code: 404,
            message: "Hama dan Penyakit tidak ditemukan",
          });
        }

        await prisma.$disconnect();

        res.status(200).json({
          code: 200,
          message: "Berhasil mengubah Hama dan Penyakit",
          data: updatePestOrDesease,
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Gagal mengubah Hama dan Penyakit",
        });
      }
      break;
    case "DELETE":
      try {
        await prisma.pestsAndDeseasesHasSymptoms.deleteMany({
          where: {
            pestAndDeseaseCode: {
              in: req.body.selectedPestsDeseases,
            },
          },
        });

        const deletePestOrDesease = await prisma.pestsAndDeseases.deleteMany({
          where: {
            code: {
              in: req.body.selectedPestsDeseases,
            },
          },
        });

        if (!deletePestOrDesease) {
          res.status(404).json({
            code: 404,
            message: "Hama dan Penyakit tidak ditemukan",
          });

          return res.status(404).json({
            code: 404,
            message: "Hama dan Penyakit tidak ditemukan",
          });
        }

        await prisma.$disconnect();

        res.status(200).json({
          code: 200,
          message: "Berhasil menghapus Hama dan Penyakit",
          data: deletePestOrDesease,
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Gagal menghapus Hama dan Penyakit",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}
