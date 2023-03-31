import {
  pestsAndDeseasesHasSymptomsRawData,
  pestsAndDeseasesRawData,
  symptomsRawData,
} from "./data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // pests and disease seed
  await prisma.pestsAndDeseases.createMany({
    data: pestsAndDeseasesRawData,
  });

  // Symptoms seed
  await prisma.symptoms.createMany({
    data: symptomsRawData,
  });

  // PestsAndDeseasesHasSymptoms seed
  await prisma.pestsAndDeseasesHasSymptoms.createMany({
    // @ts-ignore
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
