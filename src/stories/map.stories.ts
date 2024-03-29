import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { GeoJsonObject } from 'geojson';

import "../components/map";
import "../components/layer-control";
import "../components/layer-group";
import "../components/tile-layer";
import "../components/geojson";
import "../components/marker";
import "../components/circle-marker";
import { GeoJSONOptions } from "leaflet";

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
            type="base-layer"
            url-template="https://www.zeldadungeon.net/maps/totk/tiles/surface/{z}/{x}_{y}.jpg"
          >
          </hey-leaflet-tile-layer>
          <hey-leaflet-layer-group name="Markers">
            <hey-leaflet-marker latlng="[55, -114]"></hey-leaflet-marker>
            <hey-leaflet-marker latlng="[56, -114]"></hey-leaflet-marker>
            <hey-leaflet-marker latlng="[57, -114]"></hey-leaflet-marker>
          </hey-leaflet-layer-group>
          <hey-leaflet-layer-group inactive name="Circle Markers">
            <hey-leaflet-circle-marker latlng="[55, -112]"></hey-leaflet-circle-marker>
            <hey-leaflet-circle-marker latlng="[56, -112]"></hey-leaflet-circle-marker>
            <hey-leaflet-circle-marker latlng="[57, -112]"></hey-leaflet-circle-marker>
          </hey-leaflet-layer-group>
        </hey-leaflet-layer-control>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <hey-leaflet-geojson name="GeoJSON" .geojson=${args.geojson} .initalOptions=${{style: ()=> ({fillColor: 'yellow'})} as GeoJSONOptions as any}></hey-leaflet-geojson>
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
