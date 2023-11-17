import { customElement, property } from "lit/decorators.js";
import { HeyLeafletLayerBase } from "../utils/layer-base";
import L from "leaflet";

/**
 * The circle marker component.
 */
@customElement("hey-leaflet-circle-marker")
export class HeyLeafletCircleMarkerElement extends HeyLeafletLayerBase<L.CircleMarker, L.CircleMarkerOptions> {
  override name = "Circle Marker";

  /**
   * @internal
   * TODO temp fix of not able to use private identifier
   */
  private _latlng: L.LatLngExpression = [0, 0];
  get latlng() {
    return this._latlng;
  }
  @property({ type: Object }) set latlng(value: L.LatLngExpression) {
    this._latlng = value;
    this.layerInstance?.setLatLng(value);
  }

  protected createLayerInstance() {
    return L.circleMarker(this.latlng, this.initalOptions);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-circle-marker": HeyLeafletCircleMarkerElement;
  }
}
