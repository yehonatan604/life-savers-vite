import { router } from "../Router/Router";

class AnimationsService {
    private static instance: AnimationsService;

    private constructor() {
    }

    correctFooterAnimation = (links: NodeListOf<HTMLSpanElement>) => {
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

    public static getInstance(): AnimationsService {
        if (!AnimationsService.instance) {
            AnimationsService.instance = new AnimationsService();
        }
        return AnimationsService.instance;
    }

    animateImages = (images: NodeListOf<HTMLImageElement>, articles: NodeListOf<HTMLElement>) => {
        document.body.classList.add('loaded');

        function scaleImage(image: HTMLImageElement, ratio: number) {
            const scaleValue = Math.min(1, ratio * 4);
            image.style.transform = `scale(${scaleValue})`;
        }

        function scaleArticle(article: HTMLElement, ratio: number) {
            const scaleValue = Math.min(1, ratio * 4);
            article.style.transform = `scale(${scaleValue})`;
        }

        function onScroll() {
            images.forEach(image => {
                const rect = image.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const increaseRatio = 200;

                if (rect.top < windowHeight + increaseRatio && rect.bottom > 0) {
                    const visibleRatio = (windowHeight - rect.top) + increaseRatio / (windowHeight + rect.height) + increaseRatio;
                    scaleImage(image, visibleRatio);
                }
            });

            articles.forEach(article => {
                const rect = article.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const increaseRatio = 200;

                if (rect.top < windowHeight + increaseRatio && rect.bottom > 0) {
                    const visibleRatio = (windowHeight - rect.top) + increaseRatio / (windowHeight + rect.height) + increaseRatio;
                    scaleArticle(article, visibleRatio);
                }
            });

            requestAnimationFrame(onScroll);
        }

        requestAnimationFrame(onScroll);
    }

}

const anim = AnimationsService.getInstance();

const animationFuncs = {
    correctFooterAnimation: anim.correctFooterAnimation,
    animateImages: anim.animateImages
}

export { animationFuncs as animations };
