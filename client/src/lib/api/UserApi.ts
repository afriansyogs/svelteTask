const viteUrl = "http://localhost:3000/profile"

export const getUsername = async () : Promise<Response> => {
  return fetch(`${viteUrl}/getUsername`, {
    method: 'GET',
    headers: {
      'Content-type' : 'application/json',
      'accpect' : 'application/json',
    
    },
    credentials: 'include'
  })
}

export const getUserData = async () : Promise<Response> => {
  return fetch(`${viteUrl}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
    },
    credentials: 'include'
  })
}

export const updateUserData = async (formData : FormData) : Promise<Response> => {
  return fetch(`${viteUrl}/update`, {
    method: 'PATCH',
    headers: {
    },
    body: formData,
    credentials: 'include'
  })
}