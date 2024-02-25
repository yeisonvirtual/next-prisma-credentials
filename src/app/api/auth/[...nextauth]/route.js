import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "yeison@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!userFound) throw new Error('User not found');

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email
        }

      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/error',
  }
}

export const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };