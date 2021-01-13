import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTodolistAC, deleteTodolistAC} from "./todolists-reducer";

export type ActionType = ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
export const updateTaskTitleAC = (tdlId: string, taskId: string, title: string) => ({
    type: "UPDATE_TASK_TITLE",
    title: title,
    tdlId: tdlId,
    taskId: taskId
} as const)
export const removeTaskAC = (tdlId: string, taskId: string) => ({
    type: "REMOVE_TASK",
    tdlId: tdlId,
    taskId: taskId
} as const)
export const addTaskAC = (tdlId: string, title: string) => ({
    type: "ADD_TASK",
    tdlId: tdlId,
    title: title
} as const)
export const changeTaskStatusAC = (tdlId: string, taskId: string, isDone: boolean) => ({
    type: "CHANGE_TASK_STATUS", tdlId, taskId, isDone
} as const)


export const tasksReducer = (state: TaskStateType = {}, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "UPDATE_TASK_TITLE": {
            return {
                ...state,
                [action.tdlId]: state[action.tdlId].map(
                    task => task.id === action.taskId ? {...task, title: action.title} : task
                )
            }
        }
        case "REMOVE_TASK": {
            return {...state, [action.tdlId]: state[action.tdlId].filter(task => task.id !== action.taskId)}
        }
        case "ADD_TASK": {
            return {
                ...state,
                [action.tdlId]: [
                    ...state[action.tdlId],
                    {title: action.title, id: v1(), isDone: false}
                ]
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {...state, [action.tdlId]: state[action.tdlId].map(
                task => task.id === action.taskId ? {...task, isDone: !action.isDone}: task)}
        }
        case "ADD_TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "DELETE_TODOLIST": {
            delete state[action.tdlId]
            return {...state}
        }
    }
    return state
}