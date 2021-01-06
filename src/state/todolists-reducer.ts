import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodolistAC>

export const changeFilterAC = (tdlId: string, filter: FilterValueType) => ({
    type: "CHANGE_FILTER",
    tdlId: tdlId,
    filter: filter
} as const)
export const deleteTodolistAC = (tdlId: string) => ({
    type: "DELETE_TODOLIST",
    tdlId: tdlId
} as const)
export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    title: title,
    id: v1()
} as const)
export const updateTodolistAC = (title: string, tdlId: string) => ({
    type: "UPDATE_TODOLIST",
    title: title,
    tdlId: tdlId
} as const)


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType>  => {
    switch (action.type) {
        case "CHANGE_FILTER": {
            return state.map(tdl => tdl.id === action.tdlId ? {...tdl, filter: action.filter} : tdl)
        }
        case "DELETE_TODOLIST": {
            return state.filter(tdl => tdl.id !== action.tdlId)
        }
        case "ADD_TODOLIST": {
            return [{id: action.id, filter: "all", title: action.title}, ...state]
        }
        case "UPDATE_TODOLIST": {
            return state.map(tdl => tdl.id === action.tdlId ? {...tdl, title: action.title} : tdl)
        }
    }
    return state
}