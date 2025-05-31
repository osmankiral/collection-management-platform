import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";

interface ApiErrorResponse {
  status: number;
  message: string;
  data?: {
    errors?: Record<string, string[]>;
  };
}

interface UserType {
  id?: string;
  name?: string;
  email?: string;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post<{
            status: number;
            message: string;
            data: UserType;
          }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}Auth/Login`, {
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = res.data.data;

          if (res.data.status === 0 && user) {
            return {
              id: user.id ?? "1",
              name: user.name ?? "User",
              email: user.email ?? "",
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              tokenType: user.tokenType || "Bearer",
              expiresIn: user.expiresIn,
              refreshExpiresIn: user.refreshExpiresIn,
            };
          }

          throw new Error(res.data.message || "Giriş başarısız.");
        } catch (err) {
          const error = err as AxiosError<ApiErrorResponse>;
          const msg =
            error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
          throw new Error(msg);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresIn = user.expiresIn;
        token.refreshExpiresIn = user.refreshExpiresIn;
        token.accessTokenExpires = Date.now() + (user.expiresIn ?? 0) * 1000;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenType = token.tokenType;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
