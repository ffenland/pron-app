import { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

import twilio from "twilio";
import transporter from "@libs/server/sendMailer";

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const userInfo = phone ? { phone } : email ? { email } : null;
  if (!userInfo) return res.json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload: payload,
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
  // if (phone) {
  //   const messageRes = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
  //     to: process.env.TWILIO_MYNUMBER!,
  //     body: `Welcome to Carrot market. Your token is ${payload}.`,
  //   });
  //   console.log(messageRes);
  // } else if (email) {
  //   const mailOptions = {
  //     from: "''FFEN 🥕' <ffenland@gmail.com>",
  //     to: email,
  //     subject: "Welcome to carrot market",
  //     text: `Your token is ${payload}`,
  //   };
  //   const mailRes = await transporter.sendMail(mailOptions);
  //   console.log(mailRes);
  // }
  return res.json({ ok: true, token: payload });
};

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
