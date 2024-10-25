import { animations } from "../services/AnimationsService";
import { dom } from "../services/DomService";

type Route = {
    uri: string | RegExp;
    callback: Function;
}

class Router {
    routes: Route[] = [];

    constructor() {
        this.routes = [
            { uri: '/', callback: async () => { await this.loadContent('/') } },
            { uri: '/home', callback: async () => { await this.loadContent('/') } },
            { uri: '/courses', callback: async () => { await this.loadContent('/courses') } },
            { uri: '/savers', callback: () => { this.loadContent('/savers') } },
            { uri: '/building', callback: () => { this.loadContent('/building') } },
            { uri: '/jeep', callback: () => { this.loadContent('/jeep') } },
        ];
        window.onpopstate = async () => {
            this.init();
        };
    }

    init() {
        let path = window.location.pathname;
        const matched = this.routes.some(route => {
            const regEx = new RegExp(`^${route.uri}$`);
            if (path.match(regEx)) {
                const req = { path };
                route.callback.call(this, req);
                return true; // Stops further iteration once a match is found
            }
            return false; // Continue checking other routes if not matched
        });

        // If no route matches, handle the default case here (error route or fallback route)
        if (!matched) {
            this.routes.some(route => {
                if (route.uri === '/') {
                    route.callback.call(this, { path: '/' });
                    return true;
                }
            });
        }
    }

    public loadContent = async (path: string) => {
        const { outlet } = dom;
        const page = path === '/' ? 'home' : path;

        // Check if the URL hash is #contact
        if (window.location.hash === '#contact') {
            // Scroll to the contact section if hash is #contact
            document.getElementById('contact')!.scrollIntoView();
        } else {
            // Scroll to the courses section if hash is #courses
            const welcome = document.getElementById('welcome')!;
            if (welcome) {
                welcome.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        }

        try {
            const res = await fetch(`${page}.html`);
            const text = await res.text();

            // Parse the HTML content
            const parsedDocument = new DOMParser().parseFromString(text, 'text/html');

            // Extract the specific container element
            const container = parsedDocument.querySelector('#container');

            // Ensure the container exists
            if (container) {
                outlet.innerHTML = ''; // Clear previous content
                outlet.appendChild(container); // Append the new content
                animations.animateImages(dom.images(), dom.articles()); // Run animations after content is loaded
            } else {
                console.error("Container element not found in the fetched HTML.");
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    };


    public navigate = async (uri: string) => {
        history.pushState({}, '', uri);
        this.init();
    }

    public setAppRouts = (links: NodeListOf<HTMLSpanElement>) => {
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const target = e.target as HTMLSpanElement;
                if (target && 'id' in target) {
                    router.navigate(target.id);
                }
            });
        });
    }
}

const router = new Router();
router.init();
export { router };
