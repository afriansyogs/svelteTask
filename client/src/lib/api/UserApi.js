const viteUrl = "http://localhost:3000"

export const getUserData = async (token) => {
  return fetch(`${viteUrl}/profile`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updateImg = async (token, formData) => {
  return fetch(`${viteUrl}/profile/addAvatar`, {
    method: 'PATCH',
    headers: {
      // 'Content-type': 'application/json',
      // 'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
    
  })
}