import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
    })


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
                timeout: 40000,
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            // if (account && user) {
            //     console.log("account", account);
            //     console.log("user", user);
            //     console.log("token", token);

            //     return {
            //         id_token: account.id_token,
            //         accessToken: account.access_token,
            //         accessTokenExpires: Date.now() + account.expires_at! * 1000,
            //         refreshToken: account.refresh_token,
            //         user
            //     }
            // }

            if (account) {
                token.id_token = account.id_token;
            }

            return token;
        },
        async session({ session, token }) {
            // if (session) {
            //     session = Object.assign({}, session, {
            //         id_token: token.id_token,
            //         user: {
            //           name: (token.user as { name: string }).name,
            //         },
            //     });
            //     session = Object.assign({}, session, {
            //         authToken: token.myToken,
            //     });
            // }
            // session.id_token = token.id_token;

            session = Object.assign({}, session, {
                id_token: token.id_token
            });

            return session;
        },
    },
    pages: {
        signIn: '/'
    },
    secret: process.env.NEXTAUTH_SECRET,

});

export { handler as GET, handler as POST };

