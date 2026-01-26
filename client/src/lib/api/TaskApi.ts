import type { TaskStatus } from "$lib/types/type"

const viteUrl = "http://localhost:3000"

export const taskData = async () : Promise<Response> => {
  return fetch(`${viteUrl}/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  })
}

export const submitTask = async (formData : FormData) : Promise<Response> => {
  return fetch(`${viteUrl}/newTask`, {
    method: 'POST',
    headers: {
      // 'Authorization': `Bearer ${token}`
    },
    body: formData,
    credentials: 'include'
  })
}

export const taskDetail = async (id: string) : Promise<Response> => {
  return fetch(`${viteUrl}/taskDetail/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    cache: 'no-store',
    credentials: 'include'
  })
}

export const updatedTask = async (id : string, formData : FormData) : Promise<Response> => {
  console.log(id)
  return fetch(`${viteUrl}/editTask/${id}`, {
    method: 'PATCH',
    headers: {
      // 'Authorization': `Bearer ${token}`
    },
    body: formData,
    credentials: 'include'
  })
}

export const updatedStatus = async (id : string, status : TaskStatus) : Promise<Response> => {
  console.log(id)
  return fetch(`${viteUrl}/editStatus/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      id,
      status
    }),
    credentials: 'include'
  })
}

export const taskDelete = async (id : string) : Promise<Response> => {
  return fetch(`${viteUrl}/deleteTask/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  })
}