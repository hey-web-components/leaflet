import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import L from "leaflet";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import leafletCSS from "../../node_modules/leaflet/dist/leaflet.css?inline";

/**
 * The main map component.
 */
@customElement("hey-leaflet-map")
export class HeyLeafletMapElement extends LitElement {
  static styles = [
    unsafeCSS(leafletCSS),
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      [part~="container"] {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  /**
   * @internal
   */
  #containerRef: Ref<HTMLDivElement> = createRef();

  /**
   * @internal
   */
  #mapInstance?: L.Map;
  get mapInstance() {
    return this.#mapInstance;
  }

  /**
   * The Leaflet map options.
   */
  @property()
  options?: L.MapOptions;

  /**
   * @internal
   */
  #view: [number, number] = [0, 0];
  /**
   * The view. `[lat, lon]`
   */
  get view() {
    return this.#view;
  }
  @property()
  set view(value: [number, number]) {
    this.#view = value;
    this.mapInstance?.setView(value ?? [0, 0]);
  }

  /**
   * @internal
   */
  #zoom: number = 1;
  /**
   * The zoom level.
   */
  get zoom() {
    return this.#zoom;
  }
  @property()
  set zoom(value: number) {
    this.#zoom = value;
    this.mapInstance?.setZoom(value ?? 1);
  }

  protected firstUpdated() {
    this.#createMapInstance();
    this.dispatchEvent(
      new CustomEvent("mapLoaded", { detail: this.mapInstance })
    );
  }

  render() {
    return html` <div part="container" ${ref(this.#containerRef)}></div>`;
  }

  #createMapInstance() {
    if (!this.#containerRef?.value) {
      return;
    }
    this.#mapInstance = L.map(this.#containerRef.value, this.options);
    this.#initializeProps();
  }

  #initializeProps() {
    this.mapInstance?.setView(this.view, this.zoom);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hey-leaflet-map": HeyLeafletMapElement;
  }
}
