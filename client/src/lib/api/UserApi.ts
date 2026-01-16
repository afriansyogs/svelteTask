const viteUrl = "http://localhost:3000/profile"

export const getUsername = async (token : string) : Promise<Response> => {
  return fetch(`${viteUrl}/getUsername`, {
    method: 'GET',
    headers: {
      'Content-type' : 'application/json',
      'accpect' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}

export const getUserData = async (token : string) : Promise<Response> => {
  return fetch(`${viteUrl}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updateUserData = async (token : string, formData : FormData) : Promise<Response> => {
  return fetch(`${viteUrl}/update`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}