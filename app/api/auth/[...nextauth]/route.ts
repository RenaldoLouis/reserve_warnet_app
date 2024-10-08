import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await
                        fetch(`${process.env.NEXTAUTH_URL}/api/login`, { // http://localhost:3000
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            })
                        })
                    const json = await response.json();

                    if (response.status === 200) {
                        return json.result;
                    }
                    else {
                        throw (JSON.stringify(json));
                    }
                }
                catch (e: any) {
                    throw new Error(e);
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            return ({ ...token, ...user });
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        }
    }
})

export { authHandler as GET, authHandler as POST };