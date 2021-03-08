import { createAppConnector } from '@aragon/connect-core'
import {
  ErrorInvalidApp,
  ErrorInvalidConnector,
  ErrorInvalidNetwork,
} from './errors'
import TodoApp from './models/TodoApp'
import TodoAppConnectorTheGraph, {
  subgraphUrlFromChainId,
} from './thegraph/connector'

type Config = {
  subgraphUrl?: string
  pollInterval?: number
}

export default createAppConnector<TodoApp, Config>(
  ({ app, config, connector, network, orgConnector, verbose }) => {
    if (connector !== 'thegraph') {
      throw new ErrorInvalidConnector(
        `Connector unsupported: ${connector}. Please use thegraph.`
      )
    }

    if (app.name !== 'ta-todo-app') {
      throw new ErrorInvalidApp(
        `This app (${app.name}) is not compatible with this todo app connector. ` +
          `Please use an app instance of the todoapp.open.aragonpm.eth repo.`
      )
    }

    const subgraphUrl =
      config?.subgraphUrl ??
      subgraphUrlFromChainId(network.chainId) ??
      undefined

    if (!subgraphUrl) {
      throw new ErrorInvalidNetwork(
        'No subgraph could be found for this network. ' +
          'Please provide a subgraphUrl or use one of the supported networks.'
      )
    }

    let pollInterval
    if (orgConnector.name === 'thegraph') {
      pollInterval =
        config?.pollInterval ?? orgConnector.config?.pollInterval ?? undefined
    }

    const connectorTheGraph = new TodoAppConnectorTheGraph({
      pollInterval,
      subgraphUrl,
      verbose,
    })

    return new TodoApp(connectorTheGraph, app.address)
  }
)
