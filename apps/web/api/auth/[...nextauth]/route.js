const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            "http://192.168.33.140:8080/api/auths/test-login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            }
          );

          const data = await response.json();

          if (data.success && data.code === 200) {
            return {
              id: data.data.userId.toString(),
              name: data.data.nickName,
              email: data.data.username,
              username: data.data.username,
              role: data.data.role,
              accessToken: data.data.accessToken,
              expirationTime: data.data.expirationTime,
            };
          } else {
            console.log(
              "Authentication failed:",
              data.message || "Unknown error"
            );
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.username = user.username;
        token.expirationTime = user.expirationTime;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.username = token.username;
      session.expirationTime = token.expirationTime;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error", // /api/auth/error 대신 /auth/error로 변경
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
