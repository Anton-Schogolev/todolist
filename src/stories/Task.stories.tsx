import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskProps} from "../Todolist";

export default {
    title: 'TodoList/Task',
    component: Task
} as Meta;
const changeStatus = action("Status Changed")
const save = action("New name saved")
const removeTask = action("Task removed")
const baseArgs = {
    changeStatus,
    save,
    removeTask
}
const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});
TaskExample.args = {
    ...baseArgs,
    taskObj: {
        id: "1",
        isDone:false,
        title: "JS"
    }
};
/*

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
*/
