import { customElement, property } from "lit/decorators.js";
import { HeyLeafletLayerBase } from "../utils/layer-base";
import L from "leaflet";

/**
 * The marker component.
 */
@customElement("hey-leaflet-marker")
export class HeyLeafletMarkerElement extends HeyLeafletLayerBase<L.Marker, L.MarkerOptions> {
  override name = "Marker";

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
    return L.marker(this.latlng, this.options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-marker": HeyLeafletMarkerElement;
  }
}
