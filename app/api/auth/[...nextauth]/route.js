import User from "@models/user";
import { connectToDB } from "@utils/database"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {

        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error("Error fetching session user:", error);
                throw new Error("Failed to fetch session user");
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                const userExists = await User?.findOne({ email: profile.email });
                
                console.log("User exists:", userExists);
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        userName: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.error("Error signing in user:", error);
                throw new Error("Sign in failed");
            }
        }
    }
});

export { handler as GET, handler as POST }