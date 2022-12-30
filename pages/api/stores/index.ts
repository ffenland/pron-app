import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const stores = await client.store.findMany({
      include: { _count: { select: { favs: true } } },
    });
    return res.json({ ok: true, stores });
  }
  if (req.method === "POST") {
    const { name, address, description } = req.body;
    console.log("name", name, "address", address, "description", description);
    const { user } = req.session;
    console.log("user", user);
    const exists = await client.store.findUnique({
      where: { userId: user?.id },
    });
    if (exists)
      return res.json({
        ok: false,
        message: "You already have store. You can have only one.",
      });
    const store = await client.store.create({
      data: {
        image: "no image",
        name,
        address,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({ ok: true, store });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
