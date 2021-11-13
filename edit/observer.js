// observer
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
};
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            // console.log(entry.target);
            CURRENT_PAGE = entry.target;
        };
    });
}, options);