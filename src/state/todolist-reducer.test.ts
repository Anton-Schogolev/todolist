import {TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, changeFilterAC, deleteTodolistAC, todolistsReducer, updateTodolistAC} from "./todolists-reducer";

const todoListID1 = v1()
const todoListID2 = v1()
let startState: TodolistType[]
    beforeEach(() => {
        startState = [
            {
                id: todoListID1,
                title: "What to learn",
                filter: "all"
            },
            {
                id: todoListID2,
                title: "What to buy",
                filter: "all"
            }
        ]
    }
    )
test("change filter value in todolist", () => {
    const endState = todolistsReducer(startState, changeFilterAC(startState[0].id,"active"))
    expect(endState[0].filter).toBe("active")
})
test("delete todolist", () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(startState[0].id))
    expect(endState.length).toBe(1)
})
test("add todolist", () => {
    const endState = todolistsReducer(startState, addTodolistAC("newTitle"))
    expect(endState.length).toBe(3)
})
test("change todolist title", () => {
    const endState = todolistsReducer(startState, updateTodolistAC("newTitle", startState[1].id))
    expect(endState[1].title).toBe("newTitle")
})