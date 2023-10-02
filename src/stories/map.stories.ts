import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { GeoJsonObject } from 'geojson';

import "../components/map";
import "../components/layer-control";
import "../components/layer-group";
import "../components/tile-layer";
import "../components/geojson";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {
  geojson: GeoJsonObject | GeoJsonObject[] | undefined;
};

export default {
  title: "Components/Map",
  component: "hey-leaflet-map",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) =>
    html`
      <hey-leaflet-map
        zoom="5"
        view="[55, -113]"
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
          <hey-leaflet-geojson active name="GeoJSON" .geojson=${args.geojson}></hey-leaflet-geojson>
        </hey-leaflet-layer-control>
      </hey-leaflet-map>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    geojson: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -121.28906250000001,
                  53.12040528310657
                ],
                [
                  -113.5546875,
                  53.12040528310657
                ],
                [
                  -113.5546875,
                  57.89149735271034
                ],
                [
                  -121.28906250000001,
                  57.89149735271034
                ],
                [
                  -121.28906250000001,
                  53.12040528310657
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -110.390625,
                57.136239319177434
              ],
              [
                -117.42187500000001,
                54.36775852406841
              ],
              [
                -113.203125,
                51.39920565355378
              ],
              [
                -108.6328125,
                53.12040528310657
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -113,
              55
            ]
          }
        }
      ]
    } as GeoJsonObject
  },
};
