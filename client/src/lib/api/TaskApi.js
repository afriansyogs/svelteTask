const viteUrl = "http://localhost:3000"

export const taskData = async (token) => {
  return fetch(`${viteUrl}/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const submitTask = async (token, formData) => {
  return fetch(`${viteUrl}/newTask`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'applicaiton/json',
      // 'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const taskDetail = async (token, id) => {
  return fetch(`${viteUrl}/taskDetail/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    cache: 'no-store'
  })
}

export const updatedTask = async (token, id, formData) => {
  console.log(id)
  return fetch(`${viteUrl}/editTask/${id}`, {
    method: 'PATCH',
    headers: {
      // 'Content-type': 'application/json',
      // 'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const taskDelete = async (token, id) => {
  return fetch(`${viteUrl}/deleteTask/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}