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
const navToggler = document.querySelector("[data-nav-toggler]");
// navbarLinks现在只包含最终的链接，不包括下拉菜单的父级链接
const navbarLinks = document.querySelectorAll(".navbar-list > li > a[data-nav-link], .dropdown-menu a[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
  // 当主导航栏关闭时，确保所有下拉菜单也关闭
  if (!navbar.classList.contains("active")) {
    document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
      item.classList.remove("active");
    });
  }
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  // 关闭所有打开的下拉菜单
  document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
    item.classList.remove("active");
  });
}

addEventOnElem(navbarLinks, "click", closeNavbar); // 点击任何最终链接时关闭主导航和所有下拉菜单


/**
 * Dropdown menu toggle for all devices (click for mobile, hover for desktop)
 * JS handles click toggle, CSS handles hover.
 */
const dropdownParentLinks = document.querySelectorAll(".navbar-item.has-dropdown > .navbar-link");

dropdownParentLinks.forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation(); // <-- 新增这一行：阻止事件冒泡

    const parentItem = this.closest(".navbar-item.has-dropdown");
    if (parentItem) {
      // 切换父级下拉菜单项的'active'类
      parentItem.classList.toggle("active");

      // 关闭同级别其他已打开的下拉菜单
      document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
        if (item !== parentItem) {
          item.classList.remove("active");
        }
      });
    }
  });
});

// 点击导航栏外部时关闭所有下拉菜单
document.addEventListener("click", function(event) {
  const isClickInsideNavbar = event.target.closest("[data-navbar]") || event.target.closest("[data-nav-toggler]");
  const isClickInsideDropdown = event.target.closest(".navbar-item.has-dropdown");

  // 如果点击不在导航栏内部或任何下拉菜单内部，则关闭所有下拉菜单
  if (!isClickInsideNavbar && !isClickInsideDropdown) {
    document.querySelectorAll(".navbar-item.has-dropdown.active").forEach(item => {
      item.classList.remove("active");
    });
  }
});
