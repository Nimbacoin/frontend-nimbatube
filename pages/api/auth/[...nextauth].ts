import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials: any) => {
        if (
          credentials.username === "john" &&
          credentials.password === "test"
        ) {
          return {
            id: 2,
            name: "John",
            email: "johndoe@test.com",
          };
        } else {
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    // jwt: ({ token, user }) => {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    session: ({ session, token }) => {
      if (token) {
        // session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  // jwt: {
  //   secret: "test",
  //   encryption: true,
  // },
  pages: {
    signIn: "/auth/log-in",
    newUser: "/auth/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
