 let images = [{
        url: './src/img/banners/banner.svg',
        title: "Black Friday Sale banner"
    }, {
        url: './src/img/banners/banner-2.svg',
        title: "Top 10 Books banner"
    }, {
        url: './src/img/banners/banner-3.svg',
        title: "Cozy Books banner"
    }];
    
    function initSlider(images, options) {
        if (!images || !images.length) return;
    
        options = options || {
            dots: false,
            titles: false,
            autoplay: false,
            autoplayInterval: 5000
        }
    
        const sliderWrapper = document.querySelector(".slider");
        const sliderImages = sliderWrapper.querySelector(".slider__images");
    
        initImages();
    
        if (options.dots) {
            initDots();
        }
    
        if (options.titles) {
            initTitles();
        }
    
        if (options.autoplay) {
            initAutoplay();
        }
    
        function initImages() {
            images.forEach((image, index) => {
                let imageElement = document.createElement("div");
                imageElement.className = `image n${index} ${index? "" : "active"}`;
                imageElement.dataset.index = index;
                imageElement.style.backgroundImage = `url(${image.url})`;
                sliderImages.appendChild(imageElement);
            });
        }
    
        function moveSlider(num) {
            sliderImages.querySelector(".active").classList.remove("active");
            sliderImages.querySelector(`.n${num}`).classList.add("active");
    
            if (options.titles) {
                let title = sliderImages.querySelector(".slider__images-title");
                if (images[num].title) {
                    title.innerText = images[num].title;
                    title.style.display = "block";
                } else {
                    title.style.display = "none";
                }
            }
    
            if (options.dots) {
                let dotsWrapper = document.querySelector(".slider__dots");
                dotsWrapper.querySelector(".active").classList.remove("active");
                dotsWrapper.querySelector(`.n${num}`).classList.add("active");
            }
        }
    
        function initDots() {
            let dotsWrapper = document.createElement("div");
            dotsWrapper.className = "slider__dots";
            images.forEach((image, index) => {
                let dot = document.createElement("div");
                dot.className = `slider__dots-item n${index} ${index? "" : "active"}`;
                dot.dataset.index = index;
                dot.addEventListener("click", function() {
                    moveSlider(this.dataset.index);
                });
                dotsWrapper.appendChild(dot);
            });
            sliderWrapper.appendChild(dotsWrapper);
        }
    
        function initTitles() {
            let titleHTML = `<div class="slider__images-title">${images[0].title}</div>`;
            sliderImages.innerHTML += titleHTML;
        }
    
        function initAutoplay() {
            setInterval(() => {
                let currentNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
                moveSlider(nextNumber);
            }, options.autoplayInterval);
        }
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        let sliderOptions = {
            dots: true,
            titles: false,
            autoplay: true,
            autoplayInterval: 5000
        }
        initSlider(images, sliderOptions);
    });




// export { slider };