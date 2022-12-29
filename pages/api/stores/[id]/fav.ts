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
    query: { id: storeId },
    session: { user },
  } = req;

  const alreadyExists = await client.fav.findFirst({
    where: { storeId: storeId?.toString(), userId: user?.id },
  });
  if (alreadyExists) {
    // delete
    await client.fav.delete({ where: { id: alreadyExists.id } });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        store: {
          connect: {
            id: storeId?.toString(),
          },
        },
      },
    });
  }

  return res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
