import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { id } = req.query;
  if (!id) return res.json({ ok: false, message: "No id" });
  const store = await client.store.findUnique({
    where: { id: id.toString() },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          nickname: true,
        },
      },
    },
  });
  const terms = store?.name
    .split(" ")
    .map((word) => ({ name: { contains: word } }));
  const relatedStores = await client.store.findMany({
    where: { OR: terms, AND: { id: { not: store?.id } } },
  });
  console.log("relatedStore", relatedStores);

  return res.json({ ok: true, store, relatedStores });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
