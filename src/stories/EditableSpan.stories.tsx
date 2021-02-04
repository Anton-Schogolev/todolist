import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  argTypes: {
    save: {
      description: "Value EditableSpan changed"
    },
    value: {
      defaultValue: "TypeScript",
      description: "Start value EditableSpan"
    }
  },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  save: action("Value EditableSpan changed")
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
