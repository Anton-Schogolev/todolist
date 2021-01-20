import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    value: string
    save: (text: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    const [editable, setEditable] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditable()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditable = () => {
        setEditable(true)
    }
    const offEditable = () => {
        setEditable(false)
        if(title.trim() !== "")
            props.save(title)
    }
    return (<>
            {
                editable ? <TextField
                    value={title}
                    onChange={onChangeHandler}
                    onBlur={offEditable}
                    onKeyPress={onKeyPressHandler}
                    autoFocus/>
                    : <span onDoubleClick={onEditable}>{props.value}</span>
            }</>
    )
})