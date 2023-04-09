import {
  pestsAndDeseasesHasSymptomsRawData,
  pestsAndDeseasesRawData,
  symptomsRawData,
} from "./data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Pests and Disease seed
  await prisma.pestsAndDeseases.createMany({
    data: pestsAndDeseasesRawData,
  });

  // Symptoms seed
  await prisma.symptoms.createMany({
    data: symptomsRawData,
  });

  // Pests and Deseases has Symptoms seed
  await prisma.pestsAndDeseasesHasSymptoms.createMany({
    data: pestsAndDeseasesHasSymptomsRawData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
