import { Payment } from "@/app/models/Payment";
import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";

export async function GET(req: Request) {
  await connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

  const url = new URL(req.url);
  const username = url.pathname.split("/").pop(); // get last part of path

  if (!username) {
    return new Response("Username is required", { status: 400 });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const payments = await Payment.find({ reciever: user._id, status: true })
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({ success: true, payments, user }, { status: 200 });
}
