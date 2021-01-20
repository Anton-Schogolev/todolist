import React, {useCallback} from "react";
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

type TaskProps = {
    taskObj: TaskType,
    changeStatus: () => void,
    save: (title: string) => void,
    removeTask: () => void
};

const Task = React.memo((props: TaskProps) => {
    const {removeTask, save, changeStatus} = props
    const onChange = useCallback(changeStatus,[changeStatus])
    const saveHandler = useCallback(save,[save])
    const removeTaskHandler = useCallback(removeTask,[removeTask])
    return <li className={props.taskObj.isDone ? "isDone" : ""}>
        <Checkbox color={"primary"} onChange={onChange} checked={props.taskObj.isDone}/>
        <EditableSpan save={saveHandler} value={props.taskObj.title}/>
        <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
    </li>;
})

export const Todolist = React.memo((props: PropsType) => {
    const {addTask, id, changeFilter, deleteTodolist, updateTodoListTitle} = props
    let tasks = props.tasks
    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const addNewTask = useCallback((title: string) =>
        addTask(title, id),
        [id,addTask])

    const allOnClick = useCallback(() => {
        changeFilter("all", id)
    },[id, changeFilter])
    const activeOnClick = useCallback(() => {
        changeFilter("active", id)
    },[id, changeFilter])
    const completedOnClick = useCallback(() => {
        changeFilter("completed", id)
    },[id, changeFilter])

    const deleteTodolistZhdun = useCallback(() => {
        deleteTodolist(id)
    },[id, deleteTodolist])
    const updateTodolistTitle = useCallback((title: string) => {
        updateTodoListTitle(title, id)
    },[id, updateTodoListTitle])

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
            <Task key={taskObj.id}
                  taskObj={taskObj} changeStatus={changeStatus}
                  save={saveUpdate} removeTask={removeTask}/>
        )
    }
    return (<div>
        <h3><EditableSpan save={updateTodolistTitle} value={props.title}/>
            <IconButton aria-label={"delete"} onClick={deleteTodolistZhdun}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addNewTask}/>
        <ul style={{listStyleType: "none", padding: "0"}}>
            {tasks?.map(tasksMap)}{/*When we just created new todolist there is no tasks to him. Thus we need props.tasks?*/}
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
})