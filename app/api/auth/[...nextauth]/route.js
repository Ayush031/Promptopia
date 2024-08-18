import { connectToDB } from "@utils/database"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: ''
        })
    ],
    async session({ session }) {

    }
    ,
    async signIn({ profile }) {
        connectToDB();
    }
})

export default route