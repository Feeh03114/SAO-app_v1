import api from "@/service/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



interface ResponseSignIn {
    data?:DataProps;
    message: string;
}

interface DataProps{
    userId: number;
    name: string;
    email: string;
    loginType:string;
    create: string;
    expiration: string;
    token: string;
}

export default NextAuth({
    session: {
        strategy: "jwt",
        // 8 hours
        maxAge: 8 * 60 * 60, 
    },
    jwt: {
        secret: 'S@0_Un1v3rs1d@d3_2023',
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                ru: { label: "Registro Universitario", type: "number", placeholder: "Registro Universitario" },
                password: { label: "Password", type: "password" },
                remember_me: { label: "Remember me", type: "checkbox" },
            },
            async authorize(credentials:any,req) {
                try {
                    const response = await api.post("/api/auth/login", {
                        ru: credentials.ru,
                        password: credentials.password,
                        rememberPassword: credentials?.remember_me||false,
                    });

                    return response.data;
                } catch (error:any) {
                    console.log("error", error.response.data);
                    if(error?.response?.data?.message) throw new Error(error.response.data?.message);
                    throw new Error('Erro ao realizar login');
                }
            },
        }),
    ],
    pages: {
        signIn: "/",
        signOut: "/login",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user?.token,
                    expiration: user?.expiresIn,
                    refreshToken: user?.refreshToken,
                    user: user.user,
                    menu: user.menu,
                };
            }
    
            return token;
        },
    
        async session({ session, token }: any) {
            session.refreshToken = token?.refreshToken;
            session.accessToken = token?.accessToken;
            session.expiration = token?.expiration;
            session.user = token?.user;
            session.menu = token?.menu;
            return session;
        },

       /*  redirect({url, baseUrl}){
            return baseUrl.replace("3000", process.env.NEXT_PUBLIC_PORT || "3005");
        } */
    },
    //debug: process.env.NODE_ENV === "development",
});