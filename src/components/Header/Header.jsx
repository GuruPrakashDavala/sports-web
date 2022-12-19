import { useBreakpointIndex } from "@theme-ui/match-media";
import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleLeft,
//   faAngleDown,
//   faSearch,
//   faHeart,
//   faShoppingCart,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   FontAwesomeIcon,
//   faAngleLeft,
//   faAngleDown,
//   faSearch,
//   faHeart,
//   faShoppingCart,
// } from "react-icons/fa";

const Header = () => {
  let subMenu;
  const [menu, setMenu] = useState("");

  const showSubMenu = (e) => {
    if (!menu.classList.contains("active")) {
      return;
    }
    if (e.target.closest(".menu-item-has-children")) {
      const hasChildren = e.target.closest(".menu-item-has-children");
      showSelectedSubMenu(hasChildren);
    }
  };

  const showSelectedSubMenu = (hasChildren) => {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    console.log(hasChildren);
    const menuTitle =
      hasChildren.querySelector(".icon").parentNode.childNodes[0].textContent;
    menu.querySelector(".current-menu-title").innerHTML = menuTitle;
    menu.querySelector(".mobile-menu-head").classList.add("active");
  };

  const toggleMenu = () => {
    // if else condition - To hide main scroll when sidebar is open
    if (menu.classList.contains("active")) {
      document.querySelector("body").style.overflow = "visible";
    } else {
      document.querySelector("body").style.overflow = "hidden";
    }
    // Default toggle logic
    menu.classList.toggle("active");
    document.querySelector(".menu-overlay").classList.toggle("active");
  };

  const hideSubMenu = () => {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      subMenu.classList.remove("active");
    }, 300);
    menu.querySelector(".current-menu-title").innerHTML = "";
    menu.querySelector(".mobile-menu-head").classList.remove("active");
  };

  // window.onresize = () => {
  //   // console.log(window.innerWidth)
  //   if (window.innerWidth > 991) {
  //     if (menu.classList.contains("active")) {
  //       toggleMenu();
  //     }
  //   }
  // };

  const bp = useBreakpointIndex();
  if (bp > 2) {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  }

  useEffect(() => {
    const menu = document.querySelector(".menu");
    console.log(menu);
    setMenu(menu);
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row v-center">
            {/* Brand logo section */}
            <div className="header-item item-left">
              <div className="logo">
                <a href="#">MyStore </a>
              </div>
            </div>

            {/* Menu starts here */}
            <div className="header-item item-center">
              <div className="menu-overlay" onClick={toggleMenu}></div>
              <nav className="menu">
                {/* Mobile menu header - back button, logo and close button*/}
                <div className="mobile-menu-head">
                  <div className="go-back" onClick={hideSubMenu}>
                    {/* <FontAwesomeIcon icon={faAngleLeft} /> */}
                  </div>
                  <div className="current-menu-title"></div>
                  <div className="mobile-menu-close" onClick={toggleMenu}>
                    &times;
                  </div>
                </div>

                {/* Menu items */}
                <ul className="menu-main" onClick={showSubMenu}>
                  <li>
                    <a href="#">Home</a>
                  </li>

                  <li className="menu-item-has-children">
                    <a href="#">
                      New
                      <span className="icon">
                        {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                      </span>
                    </a>
                    {/* Sub menu - mega menu  */}
                    <div className="sub-menu mega-menu mega-menu-column-4">
                      {/* Image products */}
                      <div className="list-item text-center">
                        <a href="">
                          <img
                            src="img/t20_logo.png"
                            alt="new product"
                            className="imgHeight"
                          />
                          <h4 className="title">Product 1</h4>
                        </a>
                      </div>
                      <div className="list-item text-center">
                        <a href="">
                          <img
                            src="img/lpl.png"
                            alt="new product"
                            className="imgHeight"
                          />
                          <h4 className="title">Product 2</h4>
                        </a>
                      </div>
                      <div className="list-item text-center">
                        <a href="">
                          <img
                            src="img/p3.jpg"
                            alt="new product"
                            className="imgHeight"
                          />
                          <h4 className="title">Product 3</h4>
                        </a>
                      </div>
                      <div className="list-item text-center">
                        <a href="">
                          <img src="img/p4.jpg" alt="new product" />
                          <h4 className="title">Product 4</h4>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            {/* Menu ends here */}

            {/* Right items starts here */}
            <div className="header-item item-right">
              <a href="">
                <span className="icon">
                  {/* <FontAwesomeIcon icon={faSearch} /> */}
                </span>
              </a>
              <a href="">
                <span className="icon">
                  {/* <FontAwesomeIcon icon={faHeart} /> */}
                </span>
              </a>
              <a href="">
                {/* <i className="fas fa-shopping-cart"></i> */}
                <span className="icon">
                  {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
                </span>
              </a>

              {/* Mobile menu trigger */}
              <div className="mobile-menu-trigger" onClick={toggleMenu}>
                <span></span>
              </div>
            </div>
            {/* Right items ends here */}
          </div>
        </div>
      </header>

      {/* Banner starts here  */}
      {/* <section className="banner-section"></section> */}
    </>
  );
};

export default Header;
