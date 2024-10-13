import { animations } from "./services/AnimationsService";
import { dom } from "./services/DomService";
import '../styles/main.css';

const { links } = dom;
const { correctFooterAnimation } = animations;

window.onload = () => {
  correctFooterAnimation(links);
};