import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElementsManifest from "../custom-elements.json";

setCustomElementsManifest(customElementsManifest);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
