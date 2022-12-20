import { ResponseType } from "./../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import cuid from "cuid";

interface ResponseType {
  ok: true | false;
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const userInfo = phone ? { phone } : email ? { email } : null;
  if (!userInfo) return res.json({ ok: false });
  const token = await client.token.create({
    data: {
      payload: cuid(),
      user: {
        connectOrCreate: {
          where: { ...userInfo },
          create: {
            nickname: `${Date.now().toString()}guy`,
            ...(phone && { phone }),
            ...(email
              ? { email }
              : { email: `${Date.now().toString()}@datdat.com` }),
            authProvider: "CREDENTIAL",
          },
        },
      },
    },
  });

  return res.json({ ok: true, message: "testing" });
};

export default withHandler({ methods: ["POST"], handler });
