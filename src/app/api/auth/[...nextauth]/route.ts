import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken'

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(Credentials) {
                const { email, password } = Credentials as {
                    email: string;
                    password: string;
                };

                const user: any = await login({email});
                if (user) {
                    const passwordConfirm = await compare(password, user.password);
                    if(passwordConfirm) {
                        return user;
                    }
                    return null
                } else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {
            if (account?.provider === 'credentials' && user) {
                token.email = user.email,
                token.username = user.username,
                token.role = user.role
                token.id = user.id
            }
            return token;
        },

        async session({session, token}: any) {
            if ("id" in token) {
                session.user.id = token.id;
            }
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("username" in token) {
                session.user.username = token.username;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }

            const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || '', {
                algorithm: 'HS256'
            });

            session.accessToken = accessToken;

            return session;
        },
    },
    pages: {
        signIn: "/auth/sign-in"
    }
};

const handler = NextAuth(authOptions);
export default authOptions;

export {
    handler as GET, handler as POST
};