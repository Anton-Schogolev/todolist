import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todolistsReducer,
    updateTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
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
    ])
    /*const [tasks, setTasks] = useState<TaskStateType>({
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
    })*/
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    })

    const updateTaskTittle = (tittle: string, taskID: string, tdlId: string) => {
        dispatchTasks(updateTaskTitleAC(tdlId, taskID, tittle))
    }

    function removeTask(taskID: string, tdlId: string) {
        dispatchTasks(removeTaskAC(tdlId, taskID))
    }

    const addTask = (title: string, tdlId: string) => {
        dispatchTasks(addTaskAC(tdlId, title))
    }

    function changeStatus(taskID: string, isDone: boolean, tdlId: string) {
        dispatchTasks(changeTaskStatusAC(tdlId, taskID, isDone))
    }

    function changeFilter(value: FilterValueType, tdlId: string) {
        dispatchTodoLists(changeFilterAC(tdlId, value))
    }

    const deleteTodolist = (id: string) => {
        const action = deleteTodolistAC(id)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const updateTodoListTitle = (title: string, tdlId: string) => {
        dispatchTodoLists(updateTodolistAC(title, tdlId))
    }

    const todoListsMap = ((tdl: TodolistType) => {
        let tasksForTodolist = tasks[tdl.id]
        if (tdl.filter === "active") {
            tasksForTodolist = tasks[tdl.id].filter(t => !t.isDone)
        }
        if (tdl.filter === "completed") {
            tasksForTodolist = tasks[tdl.id].filter(t => t.isDone)
        }
        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
                    <Todolist
                        key={tdl.id}
                        id={tdl.id}
                        title={tdl.title}
                        tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tdl.filter}
                        deleteTodolist={deleteTodolist}
                        updateTaskTittle={updateTaskTittle}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(todoListsMap)}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

