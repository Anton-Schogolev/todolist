import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    updateTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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
    /*const todoListID1 = v1()
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
    })*/
    const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)
    const dispatch = useDispatch()

    const updateTaskTittle = useCallback((tittle: string, taskID: string, tdlId: string) => {
        dispatch(updateTaskTitleAC(tdlId, taskID, tittle))
    },[dispatch])

    const removeTask = useCallback((taskID: string, tdlId: string) => {
        dispatch(removeTaskAC(tdlId, taskID))
    },[dispatch])

    const addTask = useCallback((title: string, tdlId: string) => {
        dispatch(addTaskAC(tdlId, title))
    },[dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, tdlId: string) => {
        dispatch(changeTaskStatusAC(tdlId, taskID, isDone))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValueType, tdlId: string) => {
        dispatch(changeFilterAC(tdlId, value))
    },[dispatch])

    const deleteTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistAC(id))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])
    const updateTodoListTitle = useCallback((title: string, tdlId: string) => {
        dispatch(updateTodolistAC(title, tdlId))
    },[dispatch])

    const todoListsMap = ((tdl: TodolistType) => {
        /*if (tdl.filter === "active") {
            tasksForTodolist = useMemo(() => tasks[tdl.id].filter(t => !t.isDone), [tasks[tdl.id]])
        }
        if (tdl.filter === "completed") {
            tasksForTodolist = useMemo(()=>tasks[tdl.id].filter(t => t.isDone),[tasks[tdl.id]])
        }*/
        return (
            <Grid item key={tdl.id}>
                <Paper style={{padding: "10px"}}>
                    <Todolist
                        key={tdl.id}
                        id={tdl.id}
                        title={tdl.title}
                        tasks={tasks[tdl.id]}
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
                    {todolists.map(todoListsMap)}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


