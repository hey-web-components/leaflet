import { HeyLeafletLayerControlElement } from "../components/layer-control";
import { HeyLeafletLayerGroupElement } from "../components/layer-group";
import { HeyLeafletMapElement } from "../components/map";

export type LayerContainerElement =
  | HeyLeafletMapElement
  | HeyLeafletLayerControlElement
  | HeyLeafletLayerGroupElement;
