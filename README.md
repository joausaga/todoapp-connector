# The Graph Connector for Todo App

Connector for the decentralized TodoApp.

## Usage

```js
  const org = await connect(ORG_ADDRESS, 'thegraph', { network: 4 })

  const todoApp = await org.app('todoapp')

  const todoAppConnector = await createAppConnector(todoApp)

  const proposals = await todoAppConnector.tasksForUser(<userId>, <status>, { first: <first>, skip: <skip> })
```
