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
    query: { id },
  } = req;
  const post = await client.post.findUnique({
    where: { id: id?.toString() },
    include: {
      user: { select: { id: true, nickname: true, avatar: true } },
      answers: {
        select: {
          answer: true,
          id: true,
          user: { select: { nickname: true, id: true, avatar: true } },
        },
      },
      _count: { select: { answers: true, wonderings: true } },
    },
  });

  return res.json({ ok: true, post });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
