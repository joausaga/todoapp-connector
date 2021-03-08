import { ITodoAppConnector, TaskData } from '../types'

export default class Task {
  readonly id: string
  readonly name: string
  readonly dueDate: string
  readonly priority: string

  constructor(data: TaskData) {
    this.id = data.id
    this.name = data.name
    this.dueDate = data.dueDate
    this.priority = data.priority
  }
}
