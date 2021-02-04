import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1


import App from "../App";
import {ReduxStoreProviderDecoratorStories} from "./Decorators/ReduxStoreProviderDecorator.stories";
import {Meta, Story} from "@storybook/react/types-6-0";

export default {
  title: 'TodoList/App',
  component: App,
  decorators: [ReduxStoreProviderDecoratorStories]
} as Meta;

const Template: Story = (args) => <App {...args} />;

export const AppFormExample = Template.bind({});
AppFormExample.args = {};
