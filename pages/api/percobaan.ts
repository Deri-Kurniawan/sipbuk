import { userInputTemplate } from "./../../prisma/data";
import CertaintyFactor, { TConclusion } from "@/utils/certaintyFactor";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userInput = userInputTemplate;
  const data: TConclusion = (await new CertaintyFactor({}).generateConclusion())
    .conclusion;

  res.status(200).json(data);
}
