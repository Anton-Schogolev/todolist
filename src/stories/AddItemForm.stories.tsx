import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: "Item added"
    }
  },
} as Meta;

const Template: Story<{addItem: (title: string) => void}> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action("Item added")
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