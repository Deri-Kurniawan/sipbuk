import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      GET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        verifyToken: token,
      },
      select: {
        id: true,
        isVerified: true,
      },
    });

    if (!userExist) {
      return res
        .status(400)
        .json({ code: 400, message: "Verifikasi token tidak valid!" });
    }

    await prisma.user.update({
      where: {
        id: userExist?.id,
      },
      data: {
        isVerified: true,
        verifyToken: null,
      },
    });

    res
      .status(200)
      .json({ code: 200, message: "Email berhasil diverifikasi!" });

    // res.redirect(200, "/auth/email-verified");
  } catch (error) {
    console.log("api", error);
    res.status(500).json({ code: 500, message: "Internal server error!" });
  }

  prisma.$disconnect();
}
