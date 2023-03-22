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
    const user = await prisma.user.findFirst({
      where: {
        // @ts-ignore
        verifyToken: token,
      },
    });

    if (user) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
        },
      });

      if (!user.isVerified) {
        return res.redirect(
          `/register/email-verification?status=success&email=${user.email}`
        );
      }

      return res.redirect(
        `/register/email-verification?status=failed&email=${user.email}&reason=already_verified`
      );
    } else {
      return res.redirect(
        `/register/email-verification?status=failed&reason=broken_link`
      );
    }
  } catch (error) {
    console.log("api", error);
    res.redirect(`/register/email-verification?status=failed`);
  }

  await prisma.$disconnect();
}
