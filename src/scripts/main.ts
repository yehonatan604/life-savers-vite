import { animations } from "./services/AnimationsService";
import { dom } from "./services/DomService";

const { links } = dom;
const { correctFooterAnimation } = animations;

window.onload = () => {
  correctFooterAnimation(links);
};