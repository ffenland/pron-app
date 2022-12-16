import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { User } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, email } = req.body;
  console.log("HIHI");
  console.log(email);
  let user: User | null;
  if (email) {
    user = await client.user.findUnique({ where: { email } });
    if (!user) {
      console.log("Did not find. Will create user.");
      user = await client.user.create({
        data: {
          nickname: Date.now().toString(),
          email,
          authProvider: "CREDENTIAL",
        },
      });
    }
    console.log(user);
  }
  return res.json({ ok: true, message: "testing" });
};

export default withHandler({ methods: ["POST"], handler });
