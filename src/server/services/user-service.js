export const userService = {
  authenticate
}

function authenticate(password) {
  if (password === process.env.ADMIN_PASSWORD) {
    return {
      id: 1,
      role: 'admin'
    }
  }

  return null
}
