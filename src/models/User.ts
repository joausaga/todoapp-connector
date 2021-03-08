import { UserData, TaskData } from '../types'

export default class User {
  readonly id: string
  readonly tasks: TaskData[]

  constructor(data: UserData) {
    this.id = data.id
    this.tasks = data.tasks
  }
}
