import Task from './models/Task'
import User from './models/User'
import UserTask from './models/UserTask'

export type SubscriptionHandler = { unsubscribe: () => void }
export type SubscriptionCallback<T> = (error: Error | null, data?: T) => void
export type Address = string


export interface TaskData {
  id: string
  name: string
  dueDate: string
  priority: string
}

export interface UserData {
  id: string
  tasks: TaskData[]
}

export interface UserTaskData {
  id: string
  userId: string
  taskId: string
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITodoAppConnector {
  disconnect(): Promise<void>
  // peticion http
  user(
    appAddress: string, 
    userId: string
  ): Promise<User>
  // websocket
  onUser(
    appAddress: string,
    userId: string,
    callback: SubscriptionCallback<User>
  ): SubscriptionHandler
  task(
    appAddress: string,
    name: string,
    userId: string,
    priority: string
  ): Promise<Task>
  onTask(
    appAddress: string,
    name: string,
    userId: string,
    priority: string,
    callback: SubscriptionCallback<Task[]>
  ): SubscriptionHandler
  userTasks(
    appAddress: string,
    userId: string,
    taskId: string
  ): Promise<UserTask[]>
  onUserTasks(
    appAddress: string,
    userId: string,
    taskId: string,
    callback: SubscriptionCallback<UserTask[]>
  ): SubscriptionHandler
}
