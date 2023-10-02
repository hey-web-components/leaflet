import { LitElement } from "lit";
import { HeyLeafletMapElement } from "../components/map";
import { HeyLeafletLayerControlElement } from "../components/layer-control";
import { HeyLeafletLayerGroupElement } from "../components/layer-group";
import {
  MAP_ELEMENT_TAG,
  LAYER_CONTROL_ELEMENT_TAG,
  LAYER_GROUP_ELEMENT_TAG,
} from "./tag-names";
import { LayerContainerElement } from "./layer-container";
import { property } from "lit/decorators.js";
import { LayerType } from "./layer-type";
import L from "leaflet";

export abstract class HeyLeafletLayerBase<
  TLayer extends L.Layer = L.Layer,
  TLayerOptions extends L.LayerOptions = L.LayerOptions
> extends LitElement {
  protected layerInstance?: TLayer;

  #containerElement?: LayerContainerElement;
  protected get containerElement() {
    return this.#containerElement;
  }

  /**
   * @internal
   */
  #inactive: boolean = false;
  /**
   * Whether the layer is inactive.
   */
  get inactive() {
    return this.#inactive;
  }
  @property({ type: Boolean })
  set inactive(value: boolean) {
    this.#inactive = value;
    this.#updateLayerActiveStatus();
  }

  /**
   * The layer type. It can be `"base-layer"` or `"overlay"`.
   */
  @property()
  type: LayerType = "overlay";

  /**
   * The name to be used if inside layer control.
   */
  @property()
  name: string = "Layer";

  /**
   * The layer options.
   */
  @property({ type: Object })
  options?: TLayerOptions;

  connectedCallback() {
    super.connectedCallback();
    this.#containerElement = this.obtainLayerContainerElement();
    this.#registerLayer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#containerElement = undefined;
    this.#unregisterLayer();
  }

  constructor() {
    super();
    this.layerInstance = this.createLayerInstance();
  }

  protected obtainLayerContainerElement() {
    const parentElement = this.parentElement;
    switch (parentElement?.tagName) {
      case MAP_ELEMENT_TAG.toUpperCase():
        return parentElement as HeyLeafletMapElement;
      case LAYER_CONTROL_ELEMENT_TAG.toUpperCase():
        return parentElement as HeyLeafletLayerControlElement;
      case LAYER_GROUP_ELEMENT_TAG.toUpperCase():
        return parentElement as HeyLeafletLayerGroupElement;
    }
  }

  #registerLayer() {
    if (!this.layerInstance) {
      return;
    }
    let layerContainerInstance: L.LayerGroup | L.Map | undefined;
    switch (this.containerElement?.tagName) {
      case LAYER_CONTROL_ELEMENT_TAG.toUpperCase():
        (this.containerElement as HeyLeafletLayerControlElement)?.addLayer(
          this.layerInstance,
          this.name,
          this.type
        );
        this.#updateLayerActiveStatus();
        break;
      case MAP_ELEMENT_TAG.toUpperCase():
        layerContainerInstance = (this.containerElement as HeyLeafletMapElement)
          .mapInstance;
        if (!layerContainerInstance) {
          const eventHandler = () => {
            this.#updateLayerActiveStatus();
            this.containerElement?.removeEventListener("mapLoaded", eventHandler);
          };
          this.containerElement?.addEventListener("mapLoaded", eventHandler);
          return;
        }
        this.#updateLayerActiveStatus();
        break;
      case LAYER_GROUP_ELEMENT_TAG.toUpperCase():
        layerContainerInstance = (
          this.containerElement as HeyLeafletLayerGroupElement
        ).layerInstance;


        if (!layerContainerInstance) {
          return;
        }
        this.layerInstance.addTo(layerContainerInstance);
        break;
    }
  }

  #unregisterLayer() {
    if (!this.layerInstance) {
      return;
    }
    if (
      this.containerElement?.tagName === LAYER_CONTROL_ELEMENT_TAG.toUpperCase()
    ) {
      (this.containerElement as HeyLeafletLayerControlElement).removeLayer(
        this.layerInstance
      );
    }
    this.layerInstance.remove();
  }

  #updateLayerActiveStatus() {
    if (!this.containerElement || !this.layerInstance) {
      return;
    }
    let layerContainerInstance: L.LayerGroup | L.Map | undefined;
    switch (this.containerElement?.tagName) {
      case LAYER_CONTROL_ELEMENT_TAG.toUpperCase():
        (
          this.containerElement as HeyLeafletLayerControlElement
        ).updateActiveStatus(this.layerInstance, !this.inactive);
        break;
      // @ts-expect-error Fallthrough case in switch
      case MAP_ELEMENT_TAG.toUpperCase():
        layerContainerInstance = (this.containerElement as HeyLeafletMapElement)
          .mapInstance;
      // falls through
      case LAYER_GROUP_ELEMENT_TAG.toUpperCase():
        if (!layerContainerInstance) {
          layerContainerInstance = (
            this.containerElement as HeyLeafletLayerGroupElement
          ).layerInstance;
        }

        if (this.inactive) {
          this.layerInstance.remove();
        } else {
          if (!layerContainerInstance) {
            return;
          }
          this.layerInstance.addTo(layerContainerInstance);
        }
        break;
    }
  }

  protected abstract createLayerInstance(): TLayer;
}
