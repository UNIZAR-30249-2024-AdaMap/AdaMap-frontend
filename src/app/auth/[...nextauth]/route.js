/*
 * Autores: Marina Lamiel, Raul Lopez, Jaime Martin, Carlota Quintana
 * Descripcion: Componente encargado de la autenticación de los usuarios.
 */

import NextAuth from "next-auth/next"
import GoogleProviders from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { parse } from "date-fns"

const handler = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log("credentials ", credentials)

        const user = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/personas/login?' + new URLSearchParams({ correo: credentials.correo }).toString())

        console.log("useeeeeeeeeeeeeeeeer", user)
        if (!user) {
          throw new Error('No user found with the entered username.');
        }

        const parsedUser = await user.json()
        
        
        console.log("parsedUser", parsedUser)
        return parsedUser;  // Los datos que retorna aquí estarán disponibles en la sesión

      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Se ejecuta cada vez que el token JWT se actualiza
      if (user) {
        token.accessToken = user.token;
        token.admin = user.admin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Se ejecuta cada vez que la sesión se envía al cliente
      session.accessToken = token.accessToken;
      session.admin = token.admin;
      return session;
    }
  },
  session: {
    // Estrategia de gestión de sesión
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,  // Asegúrate de tener una clave secreta para codificar el token JWT
});

export { handler as GET, handler as POST}
