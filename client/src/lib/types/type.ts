export type Token = {
  token: string | null;
}

export interface Login {
  email: string
  password: string
}

export interface Register {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export interface User {
  id: string;          
  username: string;    
  email: string;       
  password: string;    
  userImg?: string;    
  role: Role;          
}

export interface Task {
  id: string;              
  userId: string;          
  title: string;           
  description?: string;    
  taskImg?: string[];           
  deadline: string;       
  priority: Priority;      
  status: TaskStatus;      
  createdAt?: string;      
  updatedAt?: string;      
}

export interface TaskDetail {
  id: string;
  title: string;
  description: string;
  taskImg: string[];
  deadline: string;
  priority: Priority | "";
  status: TaskStatus | "";
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum TaskStatus {
  PENDING = "PENDING",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED"
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

