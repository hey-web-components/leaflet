import { customElement, property } from "lit/decorators.js";
import { HeyLeafletLayerBase } from "../utils/layer-base";
import L from "leaflet";

/**
 * The tile layer component.
 */
@customElement("hey-leaflet-tile-layer")
export class HeyLeafletTileLayerElement extends HeyLeafletLayerBase<L.TileLayer> {
  override name = "Tile Layer";

  /**
   * @internal
   * TODO temp fix of not able to use private identifier
   */
  private _urlTemplate: string = "";
  get urlTemplate() {
    return this._urlTemplate;
  }
  @property({ attribute: "url-template" }) set urlTemplate(value: string) {
    this._urlTemplate = value;
    this.layerInstance?.setUrl(value);
  }

  protected createLayerInstance() {
    return L.tileLayer(this.urlTemplate, this.options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-tile-layer": HeyLeafletTileLayerElement;
  }
}
