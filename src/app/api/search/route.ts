import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("name") || "";

  try {
    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const users = await User.find({
      name: { $regex: query, $options: "i" },
    }).select("name username avatar tagline");

    if (users.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No users found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      users,
    });
  } catch (error: unknown) {
    console.error("Error searching users:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return Response.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
