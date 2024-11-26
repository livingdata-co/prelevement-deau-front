export const userService = {
  authenticate
}

function authenticate(password) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return null
  }

  const user = {
    role: 'admin'
  }

  return user
}
