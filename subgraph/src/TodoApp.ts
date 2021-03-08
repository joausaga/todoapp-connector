import { store, log } from '@graphprotocol/graph-ts'
import {
    AddTask as AddTaskEvent,
    DelTask as DelTaskEvent,
    UpdTask as UpdTaskEvent,
} from '../generated/templates/TodoApp/TodoApp'
import { getTaskEntity} from './helpers'

export function handleAddTask(event: AddTaskEvent): void {
    const task = getTaskEntity(event.address, event.params.taskId)
    log.debug(
        'Task created. taskId: {}', [event.params.taskId.toString()]
    )
    task.save()
}

export function handleDelTask(event: DelTaskEvent): void {
    const task = getTaskEntity(event.address, event.params.taskId)

    log.debug(
        'Task deleted. taskId: {}', [event.params.taskId.toString()]
    )
    store.remove('Task', task.id)
}

export function handleUpdTask(event: UpdTaskEvent): void {
    const task = getTaskEntity(event.address, event.params.taskId)

    log.debug(
        'Task Updated. taskId: {}', [event.params.taskId.toString()]
    )
    task.save()
}
