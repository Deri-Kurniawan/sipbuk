import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getKnowledgeBase() {
  const data = await prisma.pestsAndDeseases.findMany({
    include: {
      PestsAndDeseasesHasSymptoms: {
        include: {
          symptoms: true,
        },
      },
    },
  });

  return data;
}

export function mixKnowledgeBaseWithUserInput(
  knowledgeBaseRule: any,
  userInputData: {
    [key: string]: number;
  }[]
) {
  const knowledgeBaseRuleWithUserInputData = knowledgeBaseRule.map(
    (rule: any) => {
      const { PestsAndDeseasesHasSymptoms } = rule;

      const PestsAndDeseasesHasSymptomsWithInjectedUserCF =
        PestsAndDeseasesHasSymptoms.map((item: any) => {
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
        PestsAndDeseasesHasSymptoms:
          PestsAndDeseasesHasSymptomsWithInjectedUserCF,
      };
    }
  );

  return knowledgeBaseRuleWithUserInputData;
}

export function CFSingleRule(knowledgeBaseRuleWithUserInputData: any) {
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

  return calculatedSingleRule;
}

export function CFCombineRule(calculatedSingleRule: any) {
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

  return combinationRule;
}

export function getHighestFinalCF(combinationRule: any) {
  const getHighestFinalCF = combinationRule.reduce(
    (prev: any, current: any) =>
      prev.finalCF > current.finalCF ? prev : current,
    { finalCF: 0 }
  );

  return getHighestFinalCF;
}

prisma.$disconnect();
