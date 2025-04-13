import { uploadFilesToCloudinary } from "@/app/lib/features";
import { connectDb } from "@/app/utils/db";
import { User } from "@/app/models/User";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

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

    const updatePayload = {};
    if (name) updatePayload.name = name;
    if (username) updatePayload.username = username;
    if (email) updatePayload.email = email;
    if (tagline) updatePayload.tagline = tagline;
    if (avatar) updatePayload.avatar = avatar;
    if (banner) updatePayload.banner = banner;

    console.log("Updating user with username/email: ", params?.username);

    const updatedUser = await User.findOneAndUpdate(
      { email: params?.username },
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
