const viteUrl = "http://localhost:3000/auth"

export const userRegister = async ({username, email, password}) => {
  return fetch(`${viteUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  }) 
}

export const userLogin = async ({email, password}) => {
  return fetch(`${viteUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}