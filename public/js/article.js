/**
 * This script contains the client-side code for the side-bar utility for navigating the article.
 * May not be a necessary feature, but nice to have.
 */

// execute when the window scrolls
window.onscroll = function() {stickyNav()};

var navbar = document.getElementById("nav-wrapper");

var sticky = navbar.offsetTop;

function stickyNav() {
    // pageYOffset is deprecated, use scrollY
  if (window.scrollY > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
} 

let paragraphIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    focusNextParagraph();
});

function focusNextParagraph() {
    var nextParagraphButton = document.getElementById('next-paragraph');

    nextParagraphButton.addEventListener('click', function() {

    });
}


