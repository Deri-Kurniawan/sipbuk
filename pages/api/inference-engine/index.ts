import CertaintyFactor from "@/utils/certaintyFactor";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { data: userInputData, userId } = req.body;
      const instance = new CertaintyFactor(userInputData);
      const conclusion = (await instance.generateConclusion()).conclusion;

      try {
        const saveDiagnoseHistory = await prisma.usersDiagnoseHistory.create({
          data: {
            id: `dh-${uuidv4()}`,
            userId: userId,
            pestAndDeseaseCode: conclusion.code,
            finalCF: conclusion.finalCF,
            userInputData: JSON.stringify(userInputData),
          },
        });

        res.status(200).json({
          diagnoseId: saveDiagnoseHistory.id,
        });
        await prisma.$disconnect();
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}