import { dom } from "./services/DomService";
import { router } from "./Router/Router";
import '../styles/main.css';

window.onload = () => {
  router.setAppRouts(dom.links);
};
