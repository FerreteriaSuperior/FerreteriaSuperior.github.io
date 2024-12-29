let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// Config parameters
let countItem = items.length;
let itemActive = 0;
let isUserScrolling = false; // Track if user is scrolling

// Detect user scroll
window.addEventListener('scroll', () => {
    isUserScrolling = true; // User is scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => (isUserScrolling = false), 500); // Reset flag after 500ms of no scrolling
});

let scrollTimeout; // Timeout to reset the scroll state

// Event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
};

// Event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
};

// Auto-run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000);

function showSlider() {
    // Remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // Activate new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    
    // Scroll thumbnails only if the user is not actively scrolling
    if (!isUserScrolling) {
        setPositionThumbnail();
    }

    // Clear auto-run slider timer
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000);
}

function setPositionThumbnail() {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});
