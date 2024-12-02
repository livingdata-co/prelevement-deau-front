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
        return userService.authenticate(password)
      }
    })
  ]
}

export const getServerAuthSession = () => getServerSession(authOptions)
