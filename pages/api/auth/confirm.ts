import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token, email, phone } = req.body;
  // const userInfo = phone ? { phone } : email ? { email } : null;
  const foundToken = await client.token.findUnique({
    where: { payload: token },
    include: { user: { select: { email: true, phone: true } } },
  });

  if (!foundToken) return res.status(404).end();
  // 토큰은 일치하나, email or phone이 일치하지 않은 경우. (남의 토큰을 입력한 경우!)
  if (email && email !== foundToken?.user.email) return res.status(404).end();
  if (phone && phone !== foundToken?.user.phone) return res.status(404).end();
  req.session.user = { id: foundToken?.userId };
  await req.session.save();
  await client.token.deleteMany({
    where: { userId: foundToken.userId },
  });
  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
