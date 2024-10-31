
class AnimationsService {
    private static instance: AnimationsService;

    private constructor() { }

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

            document.querySelectorAll('.octo-wrapper').forEach((octo) => {
                const rect = octo.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const increaseRatio = 200;

                if (rect.top < windowHeight + increaseRatio && rect.bottom > 0) {
                    octo.classList.add('scale-up');
                }
            });

            requestAnimationFrame(onScroll);
        }

        requestAnimationFrame(onScroll);
    }

}

const anim = AnimationsService.getInstance();

const animationFuncs = {
    animateImages: anim.animateImages
}

export { animationFuncs as animations };
