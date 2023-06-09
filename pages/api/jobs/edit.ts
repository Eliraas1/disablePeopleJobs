import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { editJob } from "@/lib/services/jobs.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const userId = req.headers["x-header"] || "";

      if (!userId) return res.status(401).json("not Authorized");
      const id = req.body.id;
      const details = req.body;
      delete details["id"];
      const data = await editJob(id as string, details);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
