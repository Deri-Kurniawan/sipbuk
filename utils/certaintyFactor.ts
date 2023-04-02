import { PrismaClient } from "@prisma/client";

interface ICertaintyFactor {
  userInputData: any;
  knowledgeBase: any;
  calculatedSingleRuleCF: any;
  calculatedCombinationRuleCF: any;
  conclusion: any;
  generateKnowledgeBase(): Promise<any>;
  mixKnowledgeBaseWithUserCFInput(): Promise<any>;
  calculateSingleRuleCF(): Promise<any>;
  calculateCombinationRuleCF(): Promise<any>;
  generateConclusion(): Promise<any>;
}

export default class CertaintyFactor implements ICertaintyFactor {
  private _userInputData: any;
  private _knowledgeBase: any;
  private _calculatedSingleRuleCF: any;
  private _calculatedCombinationRuleCF: any;
  private _conclusion: any;

  constructor(useInputData: any) {
    this._userInputData = useInputData;
  }
  calculateCombinationRuleCF(): Promise<any> {
    throw new Error("Method not implemented.");
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

    prisma.$disconnect();

    this._knowledgeBase = data;
    return this;
  }

  async mixKnowledgeBaseWithUserCFInput() {
    const knowledgeBase = (await this.generateKnowledgeBase()).knowledgeBase;
    const knowledgeBaseRuleWithUserInputData = knowledgeBase.map(
      (rule: any) => {
        const { PestsAndDeseasesHasSymptoms } = rule;

        const PestsAndDeseasesHasSymptomsWithInjectedUserCF =
          PestsAndDeseasesHasSymptoms.map((item: any) => {
            const {
              symptoms: { code },
            } = item;

            const userCF = this._userInputData[0][code];

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

    this._knowledgeBase = knowledgeBaseRuleWithUserInputData;
    return this;
  }

  async calculateSingleRuleCF() {
    const knowledgeBase = (await this.mixKnowledgeBaseWithUserCFInput())
      .knowledgeBase;

    const calculatedSingleRule = knowledgeBase.map((rule: any) => {
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
    });

    this._calculatedSingleRuleCF = calculatedSingleRule;
    return this;
  }

  async calculateCombinationRule() {
    const combinationRule = (
      await this.calculateSingleRuleCF()
    ).calculatedSingleRuleCF.map((rule: any) => {
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
            calculatedSingleRuleCF.reduce(
              (prevCF: number, currentCF: number) => {
                // CF[H,E]a,b = CF[H,E]a * CF[H,E]b (1 - CF[H,E]a)
                const newCombinationCF = currentCF + prevCF * (1 - currentCF);
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
    });

    this._calculatedCombinationRuleCF = combinationRule;
    return this;
  }

  async generateConclusion() {
    const getHighestFinalCF = (
      await this.calculateCombinationRule()
    ).calculatedCombinationRuleCF.reduce(
      (prev: any, current: any) =>
        prev.finalCF > current.finalCF ? prev : current,
      { finalCF: 0 }
    );

    this._conclusion = getHighestFinalCF;
    return this;
  }
}
