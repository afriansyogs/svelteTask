const viteUrl = "http://localhost:3000/profile"

export const getUsername = async (token) => {
  return fetch(`${viteUrl}/getUsername`, {
    method: 'GET',
    headers: {
      'Content-type' : 'application/json',
      'accpect' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

export const getUserData = async (token) => {
  return fetch(`${viteUrl}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updateUserData = async (token, formData) => {
  return fetch(`${viteUrl}/update`, {
    method: 'PATCH',
    headers: {
      // 'Content-type': 'application/json',
      // 'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
    
  })
}