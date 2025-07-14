
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
  if (user) {
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
    token.image = user.image;
  }
  return token;
},
    async session({ session, token }:any) {
      if (token?.id) {
    session.user.id = token.id;
    session.user.name = token.name;
    session.user.email = token.email;
    session.user.image = token.image;
  }
  return session;
    },

    // 💥 THIS is where you save to your own DB
    async signIn({ user }) {
      await dbConnect();
   console.log("User:", user);
      // Check if this user is already in your custom collection
      const existingUser = await UserModel.findOne({ email: user.email });
      console.log("Existing User:", existingUser);
      if (!existingUser) {
        await UserModel.create({
          email: user.email,
          name: user.name,
          image: user.image,
  
        });
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
})