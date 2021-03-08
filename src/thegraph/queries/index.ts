import gql from 'graphql-tag'

export const USER_TASKS = (type: string) => gql`
  ${type} Tasks($id: string) {
    user(id: $id) {
      tasks {
        task {
          id
          name
          priority
        }
      }
    }
  } 
`

export const TASK = (type: string) => gql`
  ${type} Task($id: string!) {
    task(id: $id) {
      id
      name
      priority
    }
  }
`

export const USER = (type: string) => gql`
  ${type} User($id: string!) {
    user(id: $id) {
      id
    }
  }
`
