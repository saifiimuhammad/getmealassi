import { User } from "../../../models/User";
import { connectDb } from "@/app/utils/db";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID as string,
    //   clientSecret: process.env.APPLE_SECRET as string,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID as string,
    //   clientSecret: process.env.FACEBOOK_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        try {
          const uri = process.env.MONGODB_URI as string;
          const dbName = "GetmeaLassi";

          connectDb(uri, dbName);

          const currentUser = await User.findOne({ email: profile?.email });
          if (!currentUser) {
            const newUser = new User({
              username: profile?.email?.split("@")[0],
              name: profile?.name,
              email: profile?.email,
            });
            await newUser.save();
            user.name = newUser?.username;
          } else {
            user.name = currentUser?.username;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },
  },
});

export { authOptions as GET, authOptions as POST };
