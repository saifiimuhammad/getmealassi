import { connectDb } from "@/app/utils/db";
import GitHubProvider from "next-auth/providers/github";
import { User } from "../../../models/User";
import { Account, Profile, User as AuthUser } from "next-auth";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthUser;
      account: Account | null;
      profile?: Profile;
    }) {
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
};
