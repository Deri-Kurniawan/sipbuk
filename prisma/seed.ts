import { serverSideAESEncrypt } from "@/utils/cryptoAES";
import {
  pestsAndDeseasesHasSymptomsRawData,
  pestsAndDeseasesRawData,
  symptomsRawData,
  userDemoAccount,
} from "./data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createManyPestsAndDeseases = async () => {
  await prisma.pestsAndDeseases.createMany({
    data: pestsAndDeseasesRawData,
  });

  console.log("Pests and Deseases created!");
};

const createManySymptoms = async () => {
  await prisma.symptoms.createMany({
    data: symptomsRawData,
  });

  console.log("Symptoms created!");
};

const createManyPestsAndDeseasesHasSymptoms = async () => {
  await prisma.pestsAndDeseasesHasSymptoms.createMany({
    data: pestsAndDeseasesHasSymptomsRawData,
  });

  console.log("Pests and Deseases has Symptoms created!");
};

const createUser = async () => {
  await prisma.user.create({
    data: {
      ...userDemoAccount,
      password: serverSideAESEncrypt(userDemoAccount.password),
    },
  });

  console.log("User created!");
};

const deleteUser = async () => {
  await prisma.user.delete({
    where: {
      email: userDemoAccount.email,
    },
  });

  console.log("User deleted!");
};

const initialSeeds = async () => {
  createManyPestsAndDeseases();
  createManySymptoms();
  createManyPestsAndDeseasesHasSymptoms();
  createUser();
};

async function main() {
  /* example argv usage: `yarn db:seed --init` and so on */
  process.argv.find((_) => _ == "--init") && initialSeeds();
  process.argv.find((_) => _ == "--cmpad") && createManyPestsAndDeseases();
  process.argv.find((_) => _ == "--cms") && createManySymptoms();
  process.argv.find((_) => _ == "--cmpadhs") &&
    createManyPestsAndDeseasesHasSymptoms();
  process.argv.find((_) => _ == "--cu") && createUser();
  process.argv.find((_) => _ == "--du") && deleteUser();
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
