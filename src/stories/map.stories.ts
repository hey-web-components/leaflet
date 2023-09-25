import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/map";
import "../components/layer-control";
import "../components/layer-group";
import "../components/tile-layer";

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
  render: (_args) =>
    html`
      <hey-leaflet-map
        zoom="6"
        view="[30, 15]"
        style="height: 500px; width: 500px;"
      >
        <hey-leaflet-layer-control>
          <hey-leaflet-tile-layer
            name="Zelda"
            active
            type="base-layer"
            url-template="https://www.zeldadungeon.net/maps/totk/tiles/surface/{z}/{x}_{y}.jpg"
          >
          </hey-leaflet-tile-layer>
          <hey-leaflet-layer-group active name="My Layer Group">
            <hey-leaflet-tile-layer
              url-template="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            ></hey-leaflet-tile-layer>
          </hey-leaflet-layer-group>
        </hey-leaflet-layer-control>
      </hey-leaflet-map>
    `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
