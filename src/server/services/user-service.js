export const userService = {
  authenticate
}

function authenticate(password) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return null
  }

  const user = {
    id: 1,
    role: 'admin'
  }

  return user
}
