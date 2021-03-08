import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import {
  Task as TaskEntity,
  User as UserEntity
} from '../generated/schema'
import { TodoApp as TodoAppContract } from '../generated/templates/TodoApp/TodoApp'
import { getStatusByKey }  from './task-priorities'

// Entity Id Builders

function getConfigEntityId(appAddress: Address): string {
  return appAddress.toHexString()
}

function getTaskEntityId(appAddress: Address, taskId: Bytes): string {
  return (
    'appAddress:' +
    appAddress.toHexString() +
    '-' +
    'taskId:' +
    taskId.toHexString()
  )
}

function getUserEntityId(appAddress: Address, userAddress: Address): string {
  return (
    'appAddress:' +
    appAddress.toHexString() +
    '-' +
    'userAddress:' +
    userAddress.toHexString()
  )
}

// Contract Getters

// Need taskId because task.id has a different format (<appAddress>-<taskId>)
export function getTaskDataFromContract(
  appAddress: Address,
  task: TaskEntity | null,
  taskContractId: Bytes
): void {
  const todoApp = TodoAppContract.bind(appAddress)
  const taskData = todoApp.getTask(taskContractId)
  
  task.name = taskData.value1
  task.dueDate = taskData.value2
  task.exists = taskData.value3
  task.priority = getStatusByKey(taskData.value4)
}


/*export function getOrgAddress(appAddress: Address): Address {
  const todoApp = TodoAppContract.bind(appAddress)
  return todoApp.kernel()
}*/

// TheGraph Entities Getters

/*export function getConfigEntity(appAddress: Address): ConfigEntity | null {
  const configEntityId = getConfigEntityId(appAddress)
  let config = ConfigEntity.load(configEntityId)

  if (!config) {
    config = new ConfigEntity(configEntityId)
    config.maxAllocatedTasks = 0
    config.appAddress = appAddress
    config.orgAddress = getOrgAddress(appAddress)
  }

  return config
}*/

export function getTaskEntity(
  appAddress: Address,
  taskId: Bytes
): TaskEntity | null {
  const taskEntityId = getTaskEntityId(appAddress, taskId)
  let task = TaskEntity.load(taskEntityId)

  if (!task) {
    task = new TaskEntity(taskEntityId)
    task.appAddress = appAddress
    //task.orgAddress = getOrgAddress(appAddress)
  }
  getTaskDataFromContract(appAddress, task, taskId)

  return task
}

export function getUserEntity(
  appAddress: Address,
  userAddress: Address
): UserEntity | null {
  const userEntityId = getUserEntityId(appAddress, userAddress)
  let user = UserEntity.load(userEntityId)

  if (!user) {
    user = new UserEntity(userEntityId)
    //user.benefits = BigInt.fromI32(0)
    //user.available = true
    user.appAddress = appAddress
    user.userAddress = userAddress
  }

  return user
}

// Others

/*export function loadAppConfig(appAddress: Address): void {
  const config = getConfigEntity(appAddress)
  const taskAllocation = RoundRobinContract.bind(appAddress)

  config.maxAllocatedTasks = taskAllocation.MAX_ALLOCATED_TASKS()

  config.save()
} */

/* export function populateConfigDataFromContract(config: ConfigEntity, appAddress: Address): void {
    const taskAllocation = RoundRobinContract.bind(appAddress)
    const configData = taskAllocation.
} */
