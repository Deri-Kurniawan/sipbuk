import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const pestsAndDeseasesHasSymptoms: {
          pestAndDeseaseCode: number;
          symptomCode: number;
          expertCF: number;
        }[] = req.body.data;

        pestsAndDeseasesHasSymptoms.forEach(async (item) => {
          const findPestOrDesease =
            await prisma.pestsAndDeseasesHasSymptoms.findFirst({
              where: {
                pestAndDeseaseCode: item.pestAndDeseaseCode,
                AND: {
                  symptomCode: item.symptomCode,
                },
              },
            });

          if (findPestOrDesease) {
            await prisma.pestsAndDeseasesHasSymptoms.update({
              where: {
                id: findPestOrDesease.id,
              },
              data: {
                expertCF: item.expertCF,
              },
            });
          } else {
            await prisma.pestsAndDeseasesHasSymptoms.create({
              data: {
                pestAndDeseaseCode: item.pestAndDeseaseCode,
                symptomCode: item.symptomCode,
                expertCF: item.expertCF,
              },
            });
          }
        });

        await prisma.pestsAndDeseasesHasSymptoms.deleteMany({
          where: {
            pestAndDeseaseCode: req.body.pestAndDeseaseCode,
            AND: {
              symptomCode: {
                notIn: pestsAndDeseasesHasSymptoms.map((_) => _.symptomCode),
              },
            },
          },
        });

        await prisma.$disconnect();

        return res.status(200).json({
          code: 200,
          message: "Berhasil menyimpan rule",
          data: req.body,
        });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({
          code: 500,
          message: "Gagal menyimpan rule",
        });
      }
      break;
    case "PUT":
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}
