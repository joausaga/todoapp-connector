import { GraphQLWrapper, QueryResult } from '@aragon/connect-thegraph'
import { SubscriptionHandler } from '@aragon/connect-core'
import { SubscriptionCallback, ITodoAppConnector } from '../types'
import Task from '../models/Task'
import User from '../models/User'
import * as queries from './queries'

import { parseTask, parseUser } from './parsers'
import { buildUserEntityId, buildTaskEntityId } from '../helpers'

export function subgraphUrlFromChainId(chainId: number): string | null {
  // Rinkeby
  if (chainId === 4) {
    return 'https://api.thegraph.com/subgraphs/name/joausaga/aragon-todo-app-rinkeby-staging'
  }
  return null
}

type TodoAppConnectorTheGraphConfig = {
  pollInterval?: number
  subgraphUrl?: string
  verbose?: boolean
}

export default class TodoAppConnectorTheGraph
  implements ITodoAppConnector {
  #gql: GraphQLWrapper

  constructor(config: TodoAppConnectorTheGraphConfig) {
    if (!config.subgraphUrl) {
      throw new Error(
        'TodoAppConnectorTheGraph requires subgraphUrl to be passed.'
      )
    }
    this.#gql = new GraphQLWrapper(config.subgraphUrl, {
      pollInterval: config.pollInterval,
      verbose: config.verbose,
    })
  }

  async disconnect() {
    this.#gql.close()
  }

  async user(
    appAddress: string, 
    userId: string
  ): Promise<User> {
    const id = buildUserEntityId(appAddress, userId)
    return this.#gql.performQueryWithParser(
      queries.USER('query'),
      { id },
      (result: QueryResult) => parseUser(result, this)
    )
  }

  onUser(
    appAddress: string,
    userId: string,
    callback: SubscriptionCallback<User>
  ): SubscriptionHandler {
    const id = buildUserEntityId(appAddress, userId)
    return this.#gql.subscribeToQueryWithParser(
      queries.USER('subscription'),
      { id },
      callback,
      (result: QueryResult) => parseUser(result, this)
    )
  }

  async task(
    name: string,
    appAddress: string,
    userId: string,
    priority: string
  ): Promise<Task> {
    const id = buildUserEntityId(appAddress, userId)
    return this.#gql.performQueryWithParser(
      queries.TASK('query'),
      { appAddress, userId: id, name, priority },
      (result: QueryResult) => parseTask(result, this)
    )
  }

  onTask(
    name: string,
    appAddress: string,
    userId: string,
    priority: string,
    callback: SubscriptionCallback<Task[]>
  ): SubscriptionHandler {
    const id = buildUserEntityId(appAddress, userId)
    return this.#gql.subscribeToQueryWithParser(
      queries.TASK('subscription'),
      { appAddress, userId: id, status, name, priority },
      callback,
      (result: QueryResult) => parseTask(result, this)
    )
  }

  async userTasks(
    appAddress: string,
    userId: string,
    taskId: string
  ): Promise<Task[]> {
    const task_id = buildTaskEntityId(appAddress, taskId)
    const user_id = buildTaskEntityId(appAddress, userId)
    return this.#gql.performQueryWithParser(
      queries.USER_TASKS('query'),
      { userId: user_id, taskId: task_id },
      (result: QueryResult) => parseTask(result, this)
    )
  }

  onUserTasks(
    appAddress: string,
    userId: string,
    taskId: string,
    callback: SubscriptionCallback<Task[]>
  ): SubscriptionHandler {
    const task_id = buildTaskEntityId(appAddress, taskId)
    const user_id = buildTaskEntityId(appAddress, userId)
    return this.#gql.subscribeToQueryWithParser(
      queries.USER_TASKS('subscription'),
      { userId: user_id, taskId: task_id },
      callback,
      (result: QueryResult) => parseTask(result, this)
    )
  }
}
