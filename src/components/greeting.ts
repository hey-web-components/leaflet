import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A sample greeting component.
 * @fires contentChange - Fires when either `greeting` or `name` is changed.
 */
@customElement("awesome-greeting")
export class AwesomeGreetingElement extends LitElement {
  static styles = css`
    span {
      font-size: 2em;
    }
  `;

  /**
   * The greeting phrase.
   */
  @property()
  greeting = "Hello";

  /**
   * The name of whom to greeting.
   */
  @property()
  name = "World";

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has("greeting") || changedProperties.has("name")) {
      this.dispatchEvent(
        new CustomEvent("contentChange", { detail: changedProperties })
      );
    }
  }

  render() {
    return html` <span>${this.greeting}, ${this.name}!</span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "awesome-greeting": AwesomeGreetingElement;
  }
}
