import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { user } = req.session;
  const profile = await client.user.findUnique({
    where: { id: user?.id },
  });

  return res.json({ ok: true, profile });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
