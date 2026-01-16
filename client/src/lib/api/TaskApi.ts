import type { TaskStatus } from "$lib/types/type"

const viteUrl = "http://localhost:3000"

export const taskData = async (token : string) : Promise<Response> => {
  return fetch(`${viteUrl}/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const submitTask = async (token : string, formData : FormData) : Promise<Response> => {
  return fetch(`${viteUrl}/newTask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const taskDetail = async (token : string, id) : Promise<Response> => {
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

export const updatedTask = async (token : string, id : string, formData : FormData) : Promise<Response> => {
  console.log(id)
  return fetch(`${viteUrl}/editTask/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const updatedStatus = async (token : string, id : string, status : TaskStatus) : Promise<Response> => {
  console.log(id)
  return fetch(`${viteUrl}/editStatus/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      id,
      status
    })
  })
}

export const taskDelete = async (token : string, id : string) : Promise<Response> => {
  return fetch(`${viteUrl}/deleteTask/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}