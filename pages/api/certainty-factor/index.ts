import Prisma from "@prisma/client";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { v4 as uuidv4 } from "uuid";

const { PrismaClient } = Prisma;

interface ICertaintyFactorInferenceEngine {
  (userInputData: { [key: string]: number }[]): any;
}

const CertaintyFactorInferenceEngine: ICertaintyFactorInferenceEngine = async (
  userInputData
) => {
  const prisma = new PrismaClient();

  const knowledgeBaseRule = await prisma.pestsAndDeseases.findMany({
    include: {
      PestsAndDeseasesHasSymptoms: {
        include: {
          symptoms: true,
        },
      },
    },
  });

  const knowledgeBaseRuleWithUserInputData = knowledgeBaseRule.map(
    (rule: any) => {
      const { PestsAndDeseasesHasSymptoms } = rule;

      const remap = PestsAndDeseasesHasSymptoms.map((item: any) => {
        const {
          symptoms: { code },
        } = item;

        const userCF = userInputData[0][code];

        return {
          ...item,
          userCF,
        };
      });

      return {
        ...rule,
        PestsAndDeseasesHasSymptoms: remap,
      };
    }
  );

  const calculatedSingleRule = knowledgeBaseRuleWithUserInputData.map(
    (rule: any) => {
      const { PestsAndDeseasesHasSymptoms } = rule;

      if (PestsAndDeseasesHasSymptoms.length === 1) {
        const { userCF, expertCF }: any = PestsAndDeseasesHasSymptoms[0];
        const CF = userCF * expertCF;

        return {
          ...rule,
          calculatedSingleRuleCF: [CF],
        };
      }

      const calculatedSingleRuleCF = PestsAndDeseasesHasSymptoms.map(
        ({ userCF, expertCF }: any) => {
          const CF = userCF * expertCF;

          return CF;
        }
      );

      return {
        ...rule,
        calculatedSingleRuleCF,
      };
    }
  );

  // combination rule
  const combinationRule = calculatedSingleRule.map((rule: any) => {
    const { calculatedSingleRuleCF, name } = rule;

    let finalCF = 0;
    const combinationRuleCF: number[] = [];

    switch (calculatedSingleRuleCF.length) {
      case 1: // 1 CF[H,E] cannot be combined with next CF
        finalCF = calculatedSingleRuleCF[0];
        break;

      case 2:
        // 2 CF[H,E] cannot be combined with old CF
        // CF[H,E]1,2 = CF[H,E]1 * CF[H,E]2 (1 - CF[H,E]1)
        finalCF =
          calculatedSingleRuleCF[0] +
          calculatedSingleRuleCF[1] * (1 - calculatedSingleRuleCF[0]);
        break;

      default:
        if (calculatedSingleRuleCF.length > 2) {
          calculatedSingleRuleCF.reduce((prevCF: number, currentCF: number) => {
            // CF[H,E]a,b = CF[H,E]a * CF[H,E]b (1 - CF[H,E]a)
            const newCombinationCF = currentCF + prevCF * (1 - currentCF);
            combinationRuleCF.push(newCombinationCF);
            finalCF = newCombinationCF;
            return newCombinationCF;
          });
        } else {
          throw new Error(
            `"${name}" pest or desease has ${calculatedSingleRuleCF.length} PestsAndDeseaseHasSymptoms records`,
            {
              cause: `"${name}" pest or desease needs at least 1 PestsAndDeseaseHasSymptoms record`,
            }
          );
        }
    }

    return {
      ...rule,
      combinationRuleCF,
      finalCF,
    };
  });

  try {
    const getHighestFinalCF = combinationRule.reduce(
      (prev: any, current: any) =>
        prev.finalCF > current.finalCF ? prev : current,
      { finalCF: 0 }
    );

    // @ts-ignore
    const saveDiagnoseHistory = await prisma.usersDiagnoseHistory.create({
      data: {
        id: `diagnose-history-${uuidv4()}`,
        userId: "",
        pestAndDeseaseCode: getHighestFinalCF.code,
        finalCF: getHighestFinalCF.finalCF,
        userInputData: JSON.stringify(userInputData),
      },
    });

    return {
      diagnoseId: saveDiagnoseHistory.id,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json({ name: "John Doe" });
      break;
    case "POST":
      const { data } = req.body;

      const result = await CertaintyFactorInferenceEngine(data);

      res.status(200).json(result);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
