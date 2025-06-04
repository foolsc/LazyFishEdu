'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(searchTogglers, "click", toggleSearchBar);

/**
 * Dropdown menu toggle for mobile/touch devices
 */

const dropdownTogglers = document.querySelectorAll(".navbar-item.has-dropdown > .navbar-link");

dropdownTogglers.forEach(toggler => {
  toggler.addEventListener("click", function (event) {
    // Prevent default link behavior if href is '#'
    if (this.getAttribute('href') === '#') {
      event.preventDefault();
    }

    // Toggle 'active' class on the parent 'has-dropdown' item
    const parentItem = this.closest(".navbar-item.has-dropdown");
    if (parentItem) {
      parentItem.classList.toggle("active"); // Add/remove 'active' class to show/hide dropdown

      // Close other open dropdowns
      document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
        if (item !== parentItem) {
          item.classList.remove("active");
        }
      });
    }
  });
});

// Close dropdowns when clicking outside (optional, but good for UX)
document.addEventListener("click", function(event) {
  if (!event.target.closest(".navbar-item.has-dropdown") && !event.target.closest("[data-nav-toggler]")) {
    document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
      item.classList.remove("active");
    });
  }
});

// Also close dropdowns when the main mobile nav is closed
const originalCloseNavbar = closeNavbar; // Store original function
closeNavbar = function() {
  originalCloseNavbar(); // Call original closeNavbar
  document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
    item.classList.remove("active"); // Close all dropdowns
  });
};