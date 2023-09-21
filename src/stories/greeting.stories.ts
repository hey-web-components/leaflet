import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../../src/components/greeting";

type MyArgs = {
  onContentChange: () => void;
  greeting: string;
  name: string;
};

export default {
  title: "Components/Greeting",
  component: "awesome-greeting",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onContentChange: { action: "contentChange" },
  },
  render: (args) =>
    html`<awesome-greeting
      .greeting=${args.greeting}
      .name=${args.name}
      @contentChange=${args.onContentChange}
    ></awesome-greeting>`,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    greeting: "Hello",
    name: "World",
  },
};
