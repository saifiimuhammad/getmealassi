import { uploadFilesToCloudinary } from "@/app/lib/features";
import { connectDb } from "@/app/utils/db";
import { User } from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const username = formData.get("username") as string | null;
    const email = formData.get("email") as string | null;
    const tagline = formData.get("tagline") as string | null;
    const avatarRaw = formData.get("avatar") as File | null;
    const bannerRaw = formData.get("banner") as File | null;

    // Extract username from URL
    const url = new URL(req.url);
    const usernameParam = url.pathname.split("/").pop(); // last part of path

    let avatar, banner;

    if (avatarRaw) {
      const avatarBuffer = Buffer.from(await avatarRaw.arrayBuffer());
      const avatarFile = {
        buffer: avatarBuffer,
        mimetype: avatarRaw.type,
      };
      // Fix: Handle possible undefined result
      const avatarUploads = await uploadFilesToCloudinary([avatarFile]);
      if (avatarUploads && avatarUploads.length > 0) {
        const avatarUpload = avatarUploads[0];
        avatar = {
          public_id: avatarUpload.public_id,
          url: avatarUpload.url,
        };
      }
    }

    if (bannerRaw) {
      const bannerBuffer = Buffer.from(await bannerRaw.arrayBuffer());
      const bannerFile = {
        buffer: bannerBuffer,
        mimetype: bannerRaw.type,
      };
      // Fix: Handle possible undefined result
      const bannerUploads = await uploadFilesToCloudinary([bannerFile]);
      if (bannerUploads && bannerUploads.length > 0) {
        const bannerUpload = bannerUploads[0];
        banner = {
          public_id: bannerUpload.public_id,
          url: bannerUpload.url,
        };
      }
    }

    const updatePayload: {
      name?: string;
      username?: string;
      email?: string;
      tagline?: string;
      avatar?: {
        public_id: string;
        url: string;
      };
      banner?: {
        public_id: string;
        url: string;
      };
    } = {};
    if (name) updatePayload.name = name;
    if (username) updatePayload.username = username;
    if (email) updatePayload.email = email;
    if (tagline) updatePayload.tagline = tagline;
    if (avatar) updatePayload.avatar = avatar;
    if (banner) updatePayload.banner = banner;

    const updatedUser = await User.findOneAndUpdate(
      { email: usernameParam },
      updatePayload,
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/update-profile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
