/*  
    This script should be shared across all content pages.
    It ensures the navigation sidebar works as intended. 
*/

var sidenav = document.getElementById("sidenav");

var menu_button = document.getElementById("menu-button");

var nav_close_button = document.getElementById("nav-close-btn");

menu_button.addEventListener("click", openNav);

// nav_close_button.addEventListener("click", closeNav);

document.addEventListener("click", function(event) {
    if (!sidenav.contains(event.target) && !menu_button.contains(event.target)) {
        closeNav();
    }
});

function openNav() {
    // sidenav.style.width = "100%";
    sidenav.style.height = "65%";
}
  
function closeNav() {
    // sidenav.style.width = "0";
    sidenav.style.height = "0";
}
