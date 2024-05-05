import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { PrismaClient } from "@prisma/client/edge"
const prisma = new PrismaClient()
export const options = NextAuth({

    providers: [
      Credentials({
        credentials: {
          email: {},
        },
        authorize: async (credentials) => {
          let user = null
          user = await prisma.user.findUnique({
              where:{
                  email:credentials.email as string
              }
              
          })
          if (!user) {
            throw new Error("User not found.")
          }
          return user
        },
      }),
    ],
    callbacks:{
      async session({session}) {
          if(session && session.user) {
              let user = await prisma.user.findUnique({
                  where:{
                      email:session.user.email as string
                  }
                  
              })
              session.user.id = user?.id as string
          }
          
          return session
      }
    }
  })