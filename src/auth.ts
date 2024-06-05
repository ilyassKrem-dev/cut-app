
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client/edge"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
   
    providers: [
      Google,
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
      async signIn({account,profile}) {
        if(account?.provider === "google") {
          const user = await prisma.user.findUnique({
            where:{
                email:profile?.email as string
            } 
          })
          if(!user) {
            const password = generateRandomPassword(12)
            
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password,salt)
            
            await prisma.user.create({
              data:{
                email:profile?.email?.toLowerCase() || "unknown",
                emailVerified:true,
                name:profile?.name || "unknown",
                password:hashedPassword,
                image:profile?.picture,
                provider:"google"
              }
            })
            return true
          }
          return true
        }
        return true
      },
      async session({session}) {
       
          if(session && session.user) {
              let user = await prisma.user.findUnique({
                  where:{
                      email:session.user.email as string
                  }
                  
              })
              session.user.id = user?.id as string
              session.user.name = user?.name
              session.user.email = user?.email as string
              session.user.image = user?.image
              //@ts-ignore
              session.user.isBarber = user?.isBarber;
              //@ts-ignore
              session.user.completed = user?.completed;
          }
          
          return session
      },
      async jwt({token,user,trigger,session}) {
        if(trigger =="update") {
          return {...token,...session.user}
        }
        return {...token,...user}
      }
    }
  })

function generateRandomPassword(length: number): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
}