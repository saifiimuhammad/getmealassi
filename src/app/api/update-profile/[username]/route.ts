import { NextRequest, NextResponse } from "next/server";
import { uploadFilesToCloudinary } from "@/app/lib/features";
import { connectDb } from "@/app/utils/db";
import { User } from "@/app/models/User";
// import { v2 as cloudinary } from "cloudinary";

export async function POST(
  req: NextRequest,
  { params }: { params: { username: string } }
): Promise<NextResponse> {
  try {
    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    // Parse form data
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const username = formData.get("username") as string | null;
    const email = formData.get("email") as string | null;
    const tagline = formData.get("tagline") as string | null;
    const avatarRaw = formData.get("avatar") as File | null;
    const bannerRaw = formData.get("banner") as File | null;

    let avatar, banner;

    if (avatarRaw) {
      const avatarBuffer = Buffer.from(await avatarRaw.arrayBuffer());
      const avatarFile = {
        buffer: avatarBuffer,
        mimetype: avatarRaw.type,
      };
      const [avatarUpload] = await uploadFilesToCloudinary([avatarFile]);
      avatar = {
        public_id: avatarUpload.public_id,
        url: avatarUpload.url,
      };
    }

    if (bannerRaw) {
      const bannerBuffer = Buffer.from(await bannerRaw.arrayBuffer());
      const bannerFile = {
        buffer: bannerBuffer,
        mimetype: bannerRaw.type,
      };
      const [bannerUpload] = await uploadFilesToCloudinary([bannerFile]);
      banner = {
        public_id: bannerUpload.public_id,
        url: bannerUpload.url,
      };
    }

    // Construct the update payload, including only fields that are provided
    const updatePayload = {};

    if (name) updatePayload.name = name;
    if (username) updatePayload.username = username;
    if (email) updatePayload.email = email;
    if (tagline) updatePayload.tagline = tagline;
    if (avatar) updatePayload.avatar = avatar;
    if (banner) updatePayload.banner = banner;

    // Debug: Log the username you're querying for
    console.log("Updating user with username: ", params?.username);

    // Find and update the user by email (or username if needed)
    const updatedUser = await User.findOneAndUpdate(
      { email: params?.username }, // Searching by email here
      updatePayload,
      { new: true, upsert: false } // No new user will be created
    );

    // Handle case where no user was found
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return success response with updated user
    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/update-profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
