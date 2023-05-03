import { PrismaClient } from "@prisma/client";

type TUserInputData = {
  [key: string]: number;
};

type TPestsAndDeseasesHasSymptoms<T = {}> = {
  id: number;
  pestAndDeseaseCode: number;
  symptomCode: number;
  expertCF: number;
  symptoms: {
    code: number;
    info: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
} & T;

type TData<T = {}, PestsAndDeseasesHasSymptoms = {}> = {
  code: number;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  solution: string;
  activeIngredients: string;
  PestsAndDeseasesHasSymptoms: TPestsAndDeseasesHasSymptoms<PestsAndDeseasesHasSymptoms>[];
} & T;

type TKnowledgeBase = TData;

type TMixedKnowledgeBaseWithUserCFInput = TData<{}, { userCF: number }>;

type TCalculatedSingleRuleCF = TData<
  {
    calculatedSingleRuleCF: number[];
  },
  { userCF: number }
>;

type TCalculatedCombinationRuleCF = TData<
  {
    calculatedSingleRuleCF: number[];
    combinationRuleCF: number[];
    finalCF: number;
  },
  { userCF: number }
>;

type TConclusion = TCalculatedCombinationRuleCF;

interface ICertaintyFactor {
  userInputData: TUserInputData;
  knowledgeBase: TKnowledgeBase[];
  calculatedSingleRuleCF: TCalculatedSingleRuleCF[];
  calculatedCombinationRuleCF: TCalculatedCombinationRuleCF[];
  conclusion: TConclusion[];
  generateKnowledgeBase(): Promise<this>;
  mixKnowledgeBaseWithUserCFInput(): Promise<this>;
  calculateSingleRuleCF(): Promise<this>;
  generateConclusion(): Promise<this>;
}

export default class CertaintyFactor implements ICertaintyFactor {
  private _userInputData: any;
  private _knowledgeBase: any;
  private _calculatedSingleRuleCF: any;
  private _calculatedCombinationRuleCF: any;
  private _conclusion: any;

  constructor(userInputData: any) {
    this._userInputData = userInputData;
  }

  get userInputData() {
    return this._userInputData;
  }

  get knowledgeBase() {
    return this._knowledgeBase;
  }

  get calculatedSingleRuleCF() {
    return this._calculatedSingleRuleCF;
  }

  get calculatedCombinationRuleCF() {
    return this._calculatedCombinationRuleCF;
  }

  get conclusion() {
    return this._conclusion;
  }

  async generateKnowledgeBase() {
    const prisma = new PrismaClient();

    const data = await prisma.pestsAndDeseases.findMany({
      include: {
        PestsAndDeseasesHasSymptoms: {
          include: {
            symptoms: true,
          },
        },
      },
    });

    await prisma.$disconnect();

    this._knowledgeBase = data;
    return this;
  }

  async mixKnowledgeBaseWithUserCFInput() {
    const knowledgeBase: TKnowledgeBase[] = (await this.generateKnowledgeBase())
      .knowledgeBase;

    const knowledgeBaseRuleWithUserInputData: TMixedKnowledgeBaseWithUserCFInput[] =
      knowledgeBase.map(
        (rule: TKnowledgeBase): TMixedKnowledgeBaseWithUserCFInput => {
          const { PestsAndDeseasesHasSymptoms } = rule;

          const PestsAndDeseasesHasSymptomsWithInjectedUserCF: TPestsAndDeseasesHasSymptoms<{
            userCF: number;
          }>[] = PestsAndDeseasesHasSymptoms.map(
            (item: TPestsAndDeseasesHasSymptoms) => {
              const {
                symptoms: { code },
              } = item;

              const userCF: number = this._userInputData[0][code];

              return {
                ...item,
                userCF,
              };
            }
          );

          return {
            ...rule,
            PestsAndDeseasesHasSymptoms:
              PestsAndDeseasesHasSymptomsWithInjectedUserCF,
          };
        }
      );

    this._knowledgeBase = knowledgeBaseRuleWithUserInputData;
    return this;
  }

  async calculateSingleRuleCF() {
    const knowledgeBase: TMixedKnowledgeBaseWithUserCFInput[] = (
      await this.mixKnowledgeBaseWithUserCFInput()
    ).knowledgeBase;

    const calculatedSingleRule: TCalculatedSingleRuleCF[] = knowledgeBase.map(
      (rule): TCalculatedSingleRuleCF => {
        const { PestsAndDeseasesHasSymptoms } = rule;

        if (PestsAndDeseasesHasSymptoms.length === 1) {
          const {
            userCF,
            expertCF,
          }: TPestsAndDeseasesHasSymptoms<{ userCF: number }> =
            PestsAndDeseasesHasSymptoms[0];
          const CF: number = userCF * expertCF;

          return {
            ...rule,
            calculatedSingleRuleCF: [CF],
          };
        }

        const calculatedSingleRuleCF = PestsAndDeseasesHasSymptoms.map(
          ({ userCF, expertCF }) => {
            const CF: number = userCF * expertCF;

            return CF;
          }
        );

        return {
          ...rule,
          calculatedSingleRuleCF,
        };
      }
    );

    this._calculatedSingleRuleCF = calculatedSingleRule;
    return this;
  }

  async calculateCombinationRule() {
    const combinationRule: TCalculatedCombinationRuleCF[] = (
      await this.calculateSingleRuleCF()
    ).calculatedSingleRuleCF.map(
      (rule: TCalculatedSingleRuleCF): TCalculatedCombinationRuleCF => {
        const { calculatedSingleRuleCF, name } = rule;

        let finalCF: number = 0;
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
              calculatedSingleRuleCF.reduce(
                (prevCF: number, currentCF: number) => {
                  // CF[H,E]a,b = CF[H,E]a * CF[H,E]b (1 - CF[H,E]a)
                  const newCombinationCF: number =
                    currentCF + prevCF * (1 - currentCF);
                  combinationRuleCF.push(newCombinationCF);
                  finalCF = newCombinationCF;
                  return newCombinationCF;
                }
              );
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
      }
    );

    this._calculatedCombinationRuleCF = combinationRule;
    return this;
  }

  async generateConclusion() {
    const getHighestFinalCF: TConclusion = (
      await this.calculateCombinationRule()
    ).calculatedCombinationRuleCF.reduce(
      (
        prev: TCalculatedCombinationRuleCF,
        current: TCalculatedCombinationRuleCF
      ) => (prev.finalCF > current.finalCF ? prev : current),
      { finalCF: 0 }
    );

    this._conclusion = getHighestFinalCF;
    return this;
  }
}
