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

/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) =>{
    const toggle = document.getElementById(toggleId),
          sidebar = document.getElementById(sidebarId),
          header = document.getElementById(headerId),
          main = document.getElementById(mainId)
 
    if(toggle && sidebar && header && main){
        toggle.addEventListener('click', ()=>{
            /* Show sidebar */
            sidebar.classList.toggle('show-sidebar')
            /* Add padding header */
            header.classList.toggle('left-pd')
            /* Add padding main */
            main.classList.toggle('left-pd')
        })
    }
 }
 showSidebar('header-toggle','sidebar', 'header', 'main')
 
 /*=============== LINK ACTIVE ===============*/
 const sidebarLink = document.querySelectorAll('.sidebar__list a')
 
 function linkColor(){
     sidebarLink.forEach(l => l.classList.remove('active-link'))
     this.classList.add('active-link')
 }
 
 sidebarLink.forEach(l => l.addEventListener('click', linkColor))
 
 /*=============== DARK LIGHT THEME ===============*/ 
 const themeButton = document.getElementById('theme-button')
 const darkTheme = 'dark-theme'
 const iconTheme = 'ri-sun-fill'
 
 // Previously selected topic (if user selected)
 const selectedTheme = localStorage.getItem('selected-theme')
 const selectedIcon = localStorage.getItem('selected-icon')
 
 // We obtain the current theme that the interface has by validating the dark-theme class
 const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
 const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill'
 
 // We validate if the user previously chose a topic
 if (selectedTheme) {
   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
   document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
   themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme)
 }
 
 // Activate / deactivate the theme manually with the button
 themeButton.addEventListener('click', () => {
     // Add or remove the dark / icon theme
     document.body.classList.toggle(darkTheme)
     themeButton.classList.toggle(iconTheme)
     // We save the theme and the current icon that the user chose
     localStorage.setItem('selected-theme', getCurrentTheme())
     localStorage.setItem('selected-icon', getCurrentIcon())
 })
 
