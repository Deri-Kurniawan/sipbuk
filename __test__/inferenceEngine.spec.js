import CertaintyFactor from "../utils/certaintyFactor";
import { userInputTemplate } from "../prisma/data";

test("pengujian ketersediaan dan kesesuaian aturan basis pengetahuan", async () => {
  const pestsDeseaseEachRelationLength = [5, 4, 6, 2, 6, 3, 4, 5];
  const instance = new CertaintyFactor({});
  const data = await (await instance.generateKnowledgeBase()).knowledgeBase;

  expect(data).not.toBeNull();
  expect(data).toHaveLength(8);

  pestsDeseaseEachRelationLength.forEach((length, index) => {
    expect(data[index].PestsAndDeseasesHasSymptoms).toHaveLength(length);
  });
});

test("pengujian penggabungan basis pengetahuan dengan nilai masukan pengguna", async () => {
  const userInput = {
    ...userInputTemplate,
    13: 0.4,
    19: 0.6,
    20: 0.8,
  };

  const instance = new CertaintyFactor(userInput);
  const data = await (
    await instance.mixKnowledgeBaseWithUserCFInput()
  ).knowledgeBase;

  expect(data).not.toBeNull();
  expect(data).toHaveLength(8);

  data.forEach((item) => {
    item.PestsAndDeseasesHasSymptoms.forEach((item) => {
      expect(item).toHaveProperty("userCF");
    });
  });
});

test("pengujian penggunaan rumus aturan tunggal certainty factor", async () => {
  const userInput = {
    ...userInputTemplate,
    13: 0.4,
    19: 0.6,
    20: 0.8,
  };

  const instance = new CertaintyFactor(userInput);
  const data = (await instance.calculateSingleRuleCF()).calculatedSingleRuleCF;

  expect(data).not.toBeNull();
  expect(data[0]).toHaveProperty("calculatedSingleRuleCF");
});

test("pengujian penggunaan rumus aturan kombinasi certainty factor", async () => {
  const userInput = {
    ...userInputTemplate,
    13: 0.4,
    19: 0.6,
    20: 0.8,
  };

  const instance = new CertaintyFactor(userInput);
  const data = (await instance.calculateCombinationRule())
    .calculatedCombinationRuleCF;

  expect(data).not.toBeNull();
  expect(data[0]).toHaveProperty("calculatedCombinationRuleCF");
});

test("pengujian hasi diagnosa certainty factor adalah Penyakit Embun Jelaga dengan nilai 0.9456", async () => {
  const expectation = {
    name: "Penyakit Embun Jelaga",
    finalCF: 0.9456,
  };

  const userInput = {
    ...userInputTemplate,
    13: 0.4,
    19: 0.6,
    20: 0.8,
  };

  const instance = new CertaintyFactor(userInput);
  const data = (await instance.generateConclusion()).conclusion;

  expect(data).not.toBeNull();
  expect(data).toHaveProperty("name");
  expect(data.name).toBe(expectation.name);
  expect(data).toHaveProperty("finalCF");
  expect(data.finalCF).toBe(expectation.finalCF);
});

test("pengujian hasi diagnosa certainty factor adalah Hama Lalat Buah dengan nilai 0.984", async () => {
  const expectation = {
    name: "Hama Lalat Buah",
    finalCF: 0.984,
    percetagge: 98.4,
  };

  const userInput = {
    ...userInputTemplate,
    1: 0.8,
    2: 0.8,
    4: 0.6,
  };

  const instance = new CertaintyFactor(userInput);
  const data = (await instance.generateConclusion()).conclusion;

  expect(data).not.toBeNull();
  expect(data).toHaveProperty("name");
  expect(data.name).toBe(expectation.name);
  expect(data).toHaveProperty("finalCF");
  expect(data.finalCF.toFixed(3)).toBe(expectation.finalCF.toFixed(3));
});
