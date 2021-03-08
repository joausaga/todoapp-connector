import { Address, SubscriptionHandler } from '@aragon/connect-core'
import { SubscriptionCallback, ITodoAppConnector } from '../types'
import Task from './Task'
import User from './User'

export default class TodoApp {
  #appAddress: Address
  #connector: ITodoAppConnector

  constructor(connector: ITodoAppConnector, address: Address) {
    this.#connector = connector
    this.#appAddress = address
  }

  async disconnect(): Promise<void> {
    this.#connector.disconnect()
  }

  async user(userId: string): Promise<User> {
    return this.#connector.user(userId, this.#appAddress)
  }

  onUser(
    userId: string,
    callback: SubscriptionCallback<User>
  ): SubscriptionHandler {
    return this.#connector.onUser(this.#appAddress, userId, callback)
  }

  async task(
    name: string,
    userId: string,
    priority: string
  ): Promise<Task> {
    return this.#connector.task(
      this.#appAddress,
      name,
      userId,
      priority
    )
  }

  onTask(
    name: string,
    userId: string,
    priority: string,
    callback: SubscriptionCallback<Task[]>
  ): SubscriptionHandler {
    return this.#connector.onTask(
      this.#appAddress,
      name,
      userId,
      priority,
      callback
    )
  }

  async userTasks(
    userId: string,
    taskId: string
  ): Promise<Task[]> {
    return this.#connector.userTasks(
      this.#appAddress,
      userId,
      taskId
    )
  }

  onUserTasks(
    userId: string,
    taskId: string,
    callback: SubscriptionCallback<Task[]>
  ): SubscriptionHandler {
    return this.#connector.onUserTasks(
      this.#appAddress,
      userId,
      taskId,
      callback
    )
  }
}
