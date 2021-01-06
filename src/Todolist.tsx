import React from "react";
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, ButtonGroup, IconButton, Checkbox} from "@material-ui/core";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, tdlId: string) => void
    changeFilter: (allCompletedActive: FilterValueType, tdlId: string) => void
    addTask: (text: string, tdlId: string) => void
    changeStatus: (taskID: string, isDone: boolean, tdlId: string) => void
    filter: FilterValueType
    deleteTodolist: (id: string) => void
    updateTaskTittle: (tittle: string, taskID: string, tdlId: string) => void
    updateTodoListTitle: (tittle: string, tdlId: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.id)

    const allOnClick = () => {
        props.changeFilter("all", props.id)
    }
    const activeOnClick = () => {
        props.changeFilter("active", props.id)
    }
    const completedOnClick = () => {
        props.changeFilter("completed", props.id)
    }

    const deleteTodolistZhdun = () => {
        props.deleteTodolist(props.id)
    }
    const updateTodolistTitle = (title: string) => {
        props.updateTodoListTitle(title, props.id)
    }

    const tasksMap = (taskObj: TaskType) => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }
        const changeStatus = () => {
            props.changeStatus(taskObj.id, taskObj.isDone, props.id)
        }
        const saveUpdate = (title: string) => {
            props.updateTaskTittle(title, taskObj.id, props.id)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "isDone" : ""}>
                <Checkbox color={"primary"} onChange={changeStatus} checked={taskObj.isDone}/>
                <EditableSpan save={saveUpdate} value={taskObj.title}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>
            </li>
        )
    }
    return (<div>
        <h3><EditableSpan save={updateTodolistTitle} value={props.title}/>
            <IconButton aria-label={"delete"} onClick={deleteTodolistZhdun}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyleType: "none", padding: "0"}}>
            {props.tasks?.map(tasksMap)}{/*When we just created new todolist there is no tasks to him. Thus we need props.tasks?*/}
        </ul>
        <ButtonGroup style={{display: "block", textAlign: "center"}} size={"small"} color={"primary"}>
            <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={allOnClick}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={activeOnClick}>Active</Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={completedOnClick}>Completed
            </Button>
        </ButtonGroup>
    </div>)
}