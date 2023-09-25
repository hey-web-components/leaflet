import { customElement } from "lit/decorators.js";
import { HeyLeafletLayerBase } from "../utils/layer-base";
import L from "leaflet";

/**
 * The layer group component.
 */
@customElement("hey-leaflet-layer-group")
export class HeyLeafletLayerGroupElement extends HeyLeafletLayerBase<L.LayerGroup> {
  override name = "Layer Group";

  protected createLayerInstance() {
    return L.layerGroup([], this.options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-layer-group": HeyLeafletLayerGroupElement;
  }
}
