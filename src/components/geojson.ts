import { customElement, property } from "lit/decorators.js";
import { HeyLeafletLayerBase } from "../utils/layer-base";
import { GeoJsonObject } from 'geojson';
import L from "leaflet";

/**
 * The GeoJSON layer component.
 */
@customElement("hey-leaflet-geojson")
export class HeyLeafletGeoJSONElement extends HeyLeafletLayerBase<L.GeoJSON, L.GeoJSONOptions> {
  override name = "GeoJSON Layer";

  /**
   * @internal
   * TODO temp fix of not able to use private identifier
   */
  private _geojson?: GeoJsonObject | GeoJsonObject[];
  get geojson() {
    return this._geojson;
  }
  @property({ type: Object }) set geojson(value: GeoJsonObject | GeoJsonObject[] | undefined) {
    this._geojson = value;
    this.layerInstance?.clearLayers();
    if (!value) {
      return;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    value?.forEach((d) => this.layerInstance?.addData(d));
  }

  protected createLayerInstance() {
    return L.geoJSON(this.geojson, this.options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-geojson": HeyLeafletGeoJSONElement;
  }
}
