import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";

export async function POST(req: Request) {
  const { secretKey, publishableKey } = await req.json();

  const url = new URL(req.url);
  const username = url.pathname.split("/").pop(); // get dynamic [username]

  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    await connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const updatePayload: {
      secretKey?: string;
      publishableKey?: string;
    } = {};

    if (secretKey) updatePayload.secretKey = secretKey;
    if (publishableKey) updatePayload.publishableKey = publishableKey;

    const updatedUser = await User.findOneAndUpdate(
      { email: username },
      { stripeInfo: updatePayload },
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(
      {
        success: true,
        message: "Payment method updated successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in saving stripe keys:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error!",
        error,
      },
      { status: 500 }
    );
  }
}
