import {getServerSession} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import {userService} from '@/server/services/user-service.js'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.userId = user.id
      }

      return token
    },
    async session({session, token}) {
      session.user.id = token.userId
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const {password} = credentials
        const user = await userService.authenticate(password)
        if (user) {
          return {id: user.id, ...user}
        }

        return null
      }
    })
  ]
}

export const getServerAuthSession = () => getServerSession(authOptions)
