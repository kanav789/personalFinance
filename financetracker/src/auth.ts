
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import dbConnect from "./lib/db";
import UserModel from "./models/UserModel";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
   session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }:any) {
      if (token?.id) session.user.id = token.id;
      return session;
    },

    // 💥 THIS is where you save to your own DB
    async signIn({ user }) {
      await dbConnect();

      // Check if this user is already in your custom collection
      const existingUser = await UserModel.findOne({ email: user.email });
      console.log("Existing User:", existingUser);
      if (!existingUser) {
        await UserModel.create({
          email: user.email,
          name: user.name,
  
        });
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
})