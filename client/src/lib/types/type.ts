import type { Component, ComponentIcon } from "@lucide/svelte";
import type { SvelteComponentTyped } from 'svelte';
import type { IconProps } from '@lucide/svelte';
import type { ComponentType } from 'svelte';

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
  title: string;           
  description?: string | undefined;    
  taskImg?: string[];           
  deadline: string;       
  priority: Priority | string;      
  status: TaskStatus | string;      
  createdAt?: string;      
  updatedAt?: string;      
}

export interface DropEvent {
  sourceContainer: TaskStatus; 
  targetContainer: TaskStatus; 
  draggedItem: Task;
}

export interface StatusStyle {
  PENDING : string
  INPROGRESS : string
  COMPLETED : string
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

export interface SidebarItem {
  name: string
  label: string
  href: string
  icon: typeof Component<IconProps>
}