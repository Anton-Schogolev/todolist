import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./tasks-reducer";
import {addTodolistAC, deleteTodolistAC} from "./todolists-reducer";

const todoListID1 = v1()
const todoListID2 = v1()
let startState: TaskStateType
beforeEach(()=>{{startState = {
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Cheese", isDone: false},
        ]
    }}})
test("update task title", ()=>{
    const endState = tasksReducer(
        startState, updateTaskTitleAC(todoListID2, startState[todoListID2][2].id, "haha")
    )
    expect(endState[todoListID2][2].title).toBe("haha")
})
test("remove task", ()=>{
    const endState = tasksReducer(
        startState, removeTaskAC(todoListID2, startState[todoListID2][2].id)
    )
    expect(endState[todoListID2].length).toBe(2)
})
test("remove task", ()=>{
    const endState = tasksReducer(
        startState, addTaskAC(todoListID2, "haha")
    )
    expect(endState[todoListID2].length).toBe(4)
})
test("change task status", ()=>{
    const endState = tasksReducer(
        startState, changeTaskStatusAC(todoListID2, startState[todoListID2][1].id, startState[todoListID2][1].isDone)
    )
    expect(endState[todoListID2][1].isDone).toBe(true)
})
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todoListID1 && k != todoListID2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test("delete todolist should delete his tasks",() => {
    const endState = tasksReducer(startState, deleteTodolistAC(todoListID2))
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todoListID2]).not.toBeDefined();
})