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

export const taskDetail = async (token, {id}) => {
  fetch(`${viteUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updatedTask = async (token, {id, title, description, taskImg, deadline, priority, status}) => {
  fetch(`${viteUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      taskImg,
      deadline,
      priority,
      status
    })
  })
}