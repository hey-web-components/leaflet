import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import L from "leaflet";
import { MAP_ELEMENT_TAG } from "../utils/tag-names";
import { HeyLeafletMapElement } from "./map";
import { LayerType } from "../utils/layer-type";

/**
 * The layer control component.
 */
@customElement("hey-leaflet-layer-control")
export class HeyLeafletLayerControlElement extends LitElement {
  /**
   * @internal
   */
  #layerControlInstance?: L.Control.Layers;

  get #mapElement() {
    const parentElement = this.parentElement;
    if (parentElement?.tagName === MAP_ELEMENT_TAG.toUpperCase()) {
      return parentElement as HeyLeafletMapElement;
    }
  }

  get #mapInstance() {
    return this.#mapElement?.mapInstance;
  }

  /**
   * The layer control options.
   */
  @property({ type: Object })
  initalOptions?: L.Control.LayersOptions;

  connectedCallback() {
    super.connectedCallback();
    this.#addLayerControlToMap();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#layerControlInstance?.remove();
  }

  constructor() {
    super();
    this.#createLayerControlInstance();
  }

  /**
   * @internal
   */
  addLayer(layer: L.Layer, name: string, type: LayerType = "overlay") {
    switch (type) {
      case "base-layer":
        this.#layerControlInstance?.addBaseLayer(layer, name);
        break;
      case "overlay":
        this.#layerControlInstance?.addOverlay(layer, name);
        break;
    }
  }

  /**
   * @internal
   */
  removeLayer(layer: L.Layer) {
    this.#layerControlInstance?.removeLayer(layer);
  }

  /**
   * @internal
   */
  updateActiveStatus(layer: L.Layer, active: boolean = false) {
    if (!this.#mapElement) {
      return;
    }
    if (!this.#mapInstance) {
      const eventHandler = () => {
        this.updateActiveStatus(layer, active);
        this.#mapElement?.removeEventListener("mapLoaded", eventHandler);
      };
      this.#mapElement.addEventListener("mapLoaded", eventHandler);
      return;
    }
    if (active) {
      layer?.addTo(this.#mapInstance);
    } else {
      layer?.removeFrom(this.#mapInstance);
    }
  }

  #createLayerControlInstance() {
    this.#layerControlInstance?.remove();
    this.#layerControlInstance = L.control.layers(
      undefined,
      undefined,
      this.initalOptions
    );
  }

  #addLayerControlToMap() {
    if (!this.#mapElement) {
      return;
    }
    if (!this.#mapInstance) {
      const eventHandler = () => {
        this.#addLayerControlToMap();
        this.#mapElement?.removeEventListener("mapLoaded", eventHandler);
      };
      this.#mapElement.addEventListener("mapLoaded", eventHandler);
      return;
    }
    this.#layerControlInstance?.addTo(this.#mapInstance);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-layer-control": HeyLeafletLayerControlElement;
  }
}
