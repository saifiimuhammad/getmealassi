import { Payment } from "../../../models/Payment";
import { User } from "../../../models/User";
import { connectDb } from "../../../utils/db";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

  const user = await User.findOne({ username: context.params.username });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const payments = await Payment.find({ reciever: user._id, status: true })
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({ success: true, payments, user }, { status: 200 });
}
