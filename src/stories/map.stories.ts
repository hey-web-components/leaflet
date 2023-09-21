import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/map";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Map",
  component: "hey-leaflet-map",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onContentChange: { action: "contentChange" },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) =>
    html`
      <hey-leaflet-map style="height: 500px; width: 500px;"></hey-leaflet-map>
    `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
