import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { secretKey, publishableKey } = await req.json();

  console.log(secretKey, publishableKey);

  try {
    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const updatePayload: {
      secretKey?: string;
      publishableKey?: string;
    } = {};

    if (secretKey) updatePayload.secretKey = secretKey;
    if (publishableKey) updatePayload.publishableKey = publishableKey;

    console.log(updatePayload);

    const updatedUser = await User.findOneAndUpdate(
      { email: params?.username },
      { stripeInfo: updatePayload },
      { new: true, upsert: false }
    );

    console.log(updatedUser);

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
    console.log("Error in saving stripe keys: \n" + error);
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
