import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
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
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const updatedTask = tasks[tdlId].find(task => task.id === taskID)
        if (updatedTask) {
            updatedTask.title = tittle
            setTasks({...tasks})
        }
    }
    function removeTask(taskID: string, tdlId: string) {
        const filteredTasks = tasks[tdlId].filter(task => task.id !== taskID)
        setTasks({...tasks, [tdlId]: filteredTasks})
    }
    const addTask = (title: string, tdlId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        if (tasks[tdlId])
            setTasks({...tasks, [tdlId]: [newTask, ...tasks[tdlId]]})
        else setTasks({...tasks, [tdlId]: [newTask]})
    }
    function changeStatus(taskID: string, isDone: boolean, tdlId: string) {
        let task = tasks[tdlId].find(f => f.id === taskID)
        if (task) {
            task.isDone = !isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValueType, tdlId: string) {
        const tdl = todoLists.find(f => tdlId === f.id)
        if (tdl) {
            tdl.filter = value
            setTodoLists([...todoLists])
        }
    }
    const deleteTodolist = (id: string) => {
        setTodoLists(todoLists.filter(f => f.id !== id))
        delete tasks[id]
    }
    const addTodoList = (title: string) => {
        const newID = v1()
        setTodoLists([{id: newID, title: title, filter: "all"}, ...todoLists])
        setTasks({...tasks, [newID]: []})
    }
    const updateTodoListTitle = (title: string, tdlId: string) => {
        const updatedTodoList = todoLists.find(tdl => tdl.id === tdlId)
        if (updatedTodoList) {
            updatedTodoList.title = title
            setTodoLists([...todoLists])
        }
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

