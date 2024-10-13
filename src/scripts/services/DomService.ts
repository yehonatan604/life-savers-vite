// Singleton
class DomService {
    private static instance: DomService;

    // functions to get elements from the DOM on the fly
    hamburger = () => document.querySelector('#hamburger')! as HTMLButtonElement;
    nav = () => document.querySelector('nav')! as HTMLDivElement;
    header = () => document.querySelector('header')! as HTMLElement
    main = () => document.querySelector('main')! as HTMLElement;
    footer = () => document.querySelector('footer')! as HTMLElement;
    links = () => document.querySelectorAll('.link')! as NodeListOf<HTMLSpanElement>;
    images = () => document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    articles = () => document.querySelectorAll('article') as NodeListOf<HTMLElement>;
    outlet = () => document.querySelector('.outlet')! as HTMLDivElement;

    private constructor() {
        const main = this.main();
        const footer = this.footer();
        const hamburger = this.hamburger();
        const nav = this.nav();
        const header = this.header();
        const links = this.links();

        // Event listeners
        main.addEventListener('scroll', () => {
            if (main.scrollHeight - main.clientHeight <= main.scrollTop + 1) {
                footer.classList.replace('h-0', 'h-20');
                if (main.classList.contains('h-[90vh]')) {
                    main.classList.replace('h-[90vh]', 'h-[81.5vh]');
                } else {
                    main.classList.replace('h-[72.5vh]', 'h-[81.5vh]');
                }

            } else {
                footer.classList.replace('h-20', 'h-0');
                if (main.classList.contains('h-[81.5vh]')) {
                    main.classList.replace('h-[81.5vh]', 'h-[90vh]');
                } else {
                    main.classList.replace('h-[95vh]', 'h-[90vh]');
                }
            }
        });
        hamburger.addEventListener('click', () => {
            nav.classList.contains('closed') ? nav.classList.replace('closed', 'open') : nav.classList.replace('open', 'closed');
            !header.classList.contains('after') ? header.classList.add('after') : header.classList.remove('after');
            main.classList.contains('h-[90vh]') ? main.classList.replace('h-[90vh]', 'h-[72.5vh]') : main.classList.replace('h-[72.5vh]', 'h-[90vh]');
        });
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                nav.classList.replace('open', 'closed');
                header.classList.remove('after');
            });
        });
    }

    public static getInstance(): DomService {
        if (!DomService.instance) {
            DomService.instance = new DomService();
        }
        return DomService.instance;
    }
}

const dom = DomService.getInstance();

const domElements = {
    hamburger: dom.hamburger(),
    nav: dom.nav(),
    header: dom.header(),
    main: dom.main(),
    footer: dom.footer(),
    links: dom.links(),
    outlet: dom.outlet(),
    images: dom.images,
    articles: dom.articles
}

export { domElements as dom };
