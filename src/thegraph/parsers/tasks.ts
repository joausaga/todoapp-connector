import { QueryResult } from '@aragon/connect-thegraph'
import { ErrorUnexpectedResult } from '../../errors'
import Task from '../../models/Task'
import { TaskData } from '../../types'

export function parseTasks(result: QueryResult): Task[] {
  const tasks = result.data.tasks

  if (!tasks) throw new ErrorUnexpectedResult('Unable to parse tasks.')

  const datas = tasks.map((t: TaskData) => t)

  return datas.map((data: TaskData) => new Task(data))
}

export function parseTask(result: QueryResult): Task {
  const task = result.data.task

  if (!task) throw new ErrorUnexpectedResult('Unable to parse user.')

  return new Task(task)
}
