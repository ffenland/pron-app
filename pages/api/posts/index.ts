import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    body: { question },
    session: { user },
  } = req;
  if (!user) return res.json({ ok: false, message: "No user" });
  const post = await client.post.create({
    data: { question, user: { connect: { id: user.id } } },
  });

  return res.json({ ok: true, post });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
