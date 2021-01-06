import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")

    const add = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(title)
            setTitle("")
        } else setError("Title is required")
    }
    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            add()
        else
            setError('')
    }
    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={inputOnChange}
                onKeyPress={inputOnKeyPress}
                className={error ? "errorInput" : ""}
                error={Boolean(error)}
                helperText={error}
                label={"Title"}
            />
            <IconButton color={"primary"} onClick={add}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"errorMessage"}>{error}</div>}*/}
        </div>
    )
}