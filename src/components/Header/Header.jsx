/** @jsxImportSource theme-ui */

import { createRef, useEffect, useState } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import ListItemCard from "./ListItemCard";
import { FaAngleDown, FaSearch, FaShoppingCart } from "react-icons/fa";
import MenuItem from "./MenuItem";
import MobileMenuHead from "./MobileMenuHead";

const Header = () => {
  const bp = useBreakpointIndex();
  const menuRef = createRef();
  const menuOverlayRef = createRef();
  const subMenuRefOne = createRef();
  const subMenuRefTwo = createRef();
  const mobileMenuHeadRef = createRef();

  const [menu, setMenu] = useState("");
  const [subMenuTitle, setSubMenuTitle] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  useEffect(() => {
    console.log(activeSubMenu);
    console.log(subMenuRefOne);
    console.log(subMenuRefTwo);
    console.log("mobileMenuHeadRef");
    console.log(mobileMenuHeadRef);
  }, [activeSubMenu, subMenuRefOne, subMenuRefTwo]);

  // Mobile utils for opening the sidebar
  const showSubMenu = (subMenuIndex) => {
    if (!menu.classList.contains("active")) {
      return;
    }

    if (subMenuIndex === 1) {
      setActiveSubMenu(subMenuRefOne.current);
      subMenuRefOne.current.classList.add("active");
      subMenuRefOne.current.style.animation = "slideLeft 0.5s ease forwards";
      setSubMenuTitle("News");
      mobileMenuHeadRef.current.classList.add("active");
    }

    if (subMenuIndex === 2) {
      setActiveSubMenu(subMenuRefTwo.current);
      subMenuRefTwo.current.classList.add("active");
      subMenuRefTwo.current.style.animation = "slideLeft 0.5s ease forwards";
      setSubMenuTitle("Multiple categories");
      mobileMenuHeadRef.current.classList.add("active");
    }
  };

  const toggleMenu = () => {
    if (menu.classList.contains("active")) {
      document.querySelector("body").style.overflow = "visible";
    } else {
      document.querySelector("body").style.overflow = "hidden";
    }

    menu.classList.toggle("active");
    menuOverlayRef.current.classList.toggle("active");
    if (activeSubMenu && activeSubMenu.classList.contains("active")) {
      hideSubMenu();
    }
  };

  const hideSubMenu = () => {
    activeSubMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      activeSubMenu.classList.remove("active");
    }, 300);
    setSubMenuTitle("");
    mobileMenuHeadRef.current.classList.remove("active");
    setActiveSubMenu("");
  };

  useEffect(() => {
    if (bp > 2) {
      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
      }

      if (
        menuOverlayRef.current &&
        menuOverlayRef.current.classList.contains("active")
      ) {
        menuOverlayRef.current.classList.remove("active");
      }
    }
  }, [bp]);

  useEffect(() => {
    setMenu(menuRef.current);
  }, [menuRef]);

  // Common styles

  const row = {
    display: "flex",
    flexWrap: "wrap",
  };

  // Desktop styles

  const subMenuListStyles = {
    lineHeight: 1,
    margin: 0,
    display: "block",
    "> a": {
      display: "inline-block",
      padding: "10px 0",
      fontSize: "15px",
      color: "#555555",
      transition: "color 0.3s ease, background 0.3s ease",
      "&:hover": {
        color: "#ea4636",
        background: "beige",
      },
    },
  };

  const subMenuStyles = {
    position: "absolute",
    zIndex: 500,
    backgroundColor: "white",
    boxShadow: "-2px 2px 70px -25px rgba(0, 0, 0, 0.3)",
    padding: "20px 30px",
    transition: " all 0.5s ease",
    marginTop: "25px",
    opacity: 0,
    visibility: "hidden",
    // Sub menu nested styles
    "> ul > li": subMenuListStyles,
    "> .single-column-menu": {
      minWidth: "280px",
      maxWidth: "350px",
    },
  };

  const menuButtonStyles = {
    fontSize: "15px",
    fontWeight: "500",
    color: "black",
    position: "relative",
    textTransform: "capitalize",
    transition: "color 0.5s ease",
  };

  const menuStyles = {
    "> ul li": {
      display: "inline-block",
      lineHeight: "50px",
      marginLeft: "25px",
      "> a": {},
      "> .sub-menu": subMenuStyles,
      "> .sub-menu.mega-menu": {
        left: "50%",
        transform: "translateX(-50%)",
        "> .list-item": {
          "> ul > li": subMenuListStyles,
        },
      },

      "> .sub-menu.mega-menu-column-4": {
        // maxWidth: "1100px",
        maxWidth: "900px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "20px 15px",
        // List item styles
        "> .list-item": {
          flex: "0 0 25%",
          padding: "0 15px",
          "> .title": {
            fontSize: "16px",
            color: "#ea4636",
            fontWeight: 500,
            lineHeight: 1,
            padding: "10px 0",
            margin: 0,
          },
          ".text-center": {
            "> a > .title": {
              textAlign: "center",
            },
          },
          // Should be revised after testing with different layouts
          "> a img": {
            maxWidth: "100%",
            width: "100%",
            verticalAlign: "middle",
            marginTop: "10px",
          },
        },
      },
    },
    // show submenu if available when hovered on menu title
    "> ul li.menu-item-has-children": {
      "&:hover": {
        "> .sub-menu": {
          marginTop: 0,
          visibility: "visible",
          opacity: 1,
        },
      },
    },
    "> .mobile-menu-head": {
      display: "none",
    },
  };

  const headerStyles = {
    display: "block",
    width: "100%",
    position: "relative",
    zIndex: "99",
    padding: "15px",
    "> .mobile-menu-trigger": {
      display: "none",
    },
  };

  const itemLeft = {
    flex: "0 0 17%",
  };

  const itemRightIcons = {
    textDecoration: "none",
    fontSize: "16px",
    color: "#555555",
    display: "inline-block",
    marginLeft: "10px",
    transition: "color 0.5s ease",
  };

  const itemRight = {
    flex: "0 0 17%",
    display: "flex",
    justifyContent: "flex-end",
    "> a": itemRightIcons,
    "> .mobile-menu-trigger": {
      display: "none",
    },
  };

  const logoLink = {
    fontSize: "30px",
    color: "#000000",
    textDecoration: "none",
    fontWeight: 700,
  };

  const headerItemCenter = {
    flex: "0 0 66%",
  };

  const container = {
    maxWidth: "1200px",
    margin: "auto",
    width: "100%",
  };

  // Mobile styles

  const menuOverlayStyles = {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1098,
    visibility: "hidden",
    opacity: 0,
    transition: "all 0.5s ease",
  };

  const menuOverlayActiveStyles = {
    visibility: "visible",
    opacity: 1,
  };

  const smHeaderItemCenter = {
    order: 3,
    flex: "0 0 100%",
    "> .menu.active": {
      transform: "translate(0%)",
    },
    "> .menu-overlay": menuOverlayStyles,
    "> .menu-overlay.active": menuOverlayActiveStyles,
  };

  const smHeaderItemLeftAndRight = {
    flex: "0 0 auto",
  };

  /* Mobile menu trigger */
  const mobileMenuTrigger = {
    display: "flex",
    height: "30px",
    width: "30px",
    marginLeft: "15px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    "> span": {
      display: "block",
      height: "2px",
      backgroundColor: "#333333",
      width: "24px",
      position: "relative",
    },
    "> span:before, > span:after": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#333333",
    },
    "> span:before": {
      top: "-6px",
    },
    "> span:after": {
      top: "6px",
    },
  };

  const smItemRight = {
    ...smHeaderItemLeftAndRight,
    alignItems: "center",
    "> .mobile-menu-trigger": mobileMenuTrigger,
  };

  const vCenter = {
    alignItems: "center",
    ...(bp < 3 ? { justifyContent: "space-between" } : {}),
  };

  const smHeaderStyles = {
    display: "block",
    width: "100%",
    position: "relative",
    zIndex: "99",
    padding: "15px",
  };

  const smSubMenuStyles = {
    visibility: "visible",
    opacity: 1,
    position: "absolute",
    boxShadow: "none",
    margin: 0,
    padding: "15px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: "85px",
    maxWidth: "none",
    minWidth: "auto",
    /* Hide sub menu in iniail state */
    display: "none",
    transform: "translateX(0%)",
    overflowY: "auto",
    zIndex: 500,
    backgroundColor: "white",
    transition: "all 0.5s ease",
    ".list-item > ul > li > a": {
      display: "block",
      padding: "10px 0",
      color: "#555555",
      textDecoration: "none",
      textTransform: "capitalize",
      transition: "color 0.3s ease",
      "&:hover": {
        color: "#ea4636",
        background: "beige",
      },
    },
    ".list-item > ul": {
      marginBottom: "15px",
    },
  };

  const smMenuStyles = {
    position: "fixed",
    width: "320px",
    backgroundColor: "#ffffff",
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
    transform: "translate(-100%)",
    transition: "all 0.5s ease",
    zIndex: "1099",
    "> ul > li": {
      lineHeight: 1,
      margin: 0,
      display: "block",
      "> a": {
        ...menuButtonStyles,
        lineHeight: "50px",
        height: "50px",
        padding: "0 50px 0 15px",
        display: "block",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        "> .icon": {
          position: "absolute",
          height: "50px",
          width: "50px",
          top: 0,
          right: 0,
          textAlign: "center",
          lineHeight: "50px",
          transform: " rotate(-90deg)",
        },
      },
      ".sub-menu.mega-menu, .sub-menu": smSubMenuStyles,
      // Show submenu when active class is attached
      ".sub-menu.active": {
        display: "block",
      },
      ".sub-menu.mega-menu-column-4 > .list-item > img": {
        marginTop: 0,
        width: "250px", // static
      },
      ".sub-menu.mega-menu-column-4 > .list-item > .title": {
        color: "#ea4636",
        fontWeight: "500",
        lineHeight: 1,
        padding: "10px 0",
        margin: 0,
      },
      ".sub-menu.mega-menu-column-4 > .list-item.text-center > .title": {
        marginBottom: "20px",
      },
      ".sub-menu.mega-menu-column-4 > .list-item.text-center > a > .title": {
        marginBottom: "20px",
      },
      ".sub-menu.mega-menu-column-4 > .list-item.text-center:last-child > a > .title":
        {
          marginBottom: "0px",
        },
      ".sub-menu.mega-menu-column-4 > .list-item": {
        flex: "0 0 100%",
        padding: 0,
      },
    },
    // Mobile header top bar styles
    ".mobile-menu-head": {
      display: "flex",
      height: "70px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 501,
      position: "sticky",
      backgroundColor: "#ffffff",
      top: 0,
      "> .go-back": {
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        color: "#000000",
        fontSize: "16px",
        height: "100%",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        /* Hide go back in initial state */
        display: "none",
      },
      // TODO: Should be updated
      "> .current-menu-title": {
        fontSize: "15px",
        fontWeight: 500,
        color: "#000000",
      },

      /* Close button */
      "> .mobile-menu-close": {
        color: "#000000",
        fontSize: "25px",
        borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        display: "flex",
        height: "100%",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    // Mobile menu head active state
    ".mobile-menu-head.active > .go-back": {
      display: "flex",
    },

    /* Menu main layout */
    "> .menu-main": {
      height: "100%",
      overflowX: "hidden",
      overflowY: "auto",
    },
  };

  const headerCSS = bp > 2 ? headerStyles : smHeaderStyles;
  const itemLeftCSS = bp > 2 ? itemLeft : smHeaderItemLeftAndRight;
  const itemCenterCSS = bp > 2 ? headerItemCenter : smHeaderItemCenter;
  const menuCSS = bp > 2 ? menuStyles : smMenuStyles;

  return (
    <>
      <div
        sx={{
          backgroundColor: "beige",
          color: "black",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        A test div with theme UI props
      </div>

      <header sx={headerCSS}>
        <div id="container" sx={container}>
          <div id="row v-center" sx={{ ...row, ...vCenter }}>
            {/* Left item - Brand logo section */}
            <div id="item-left" sx={itemLeftCSS}>
              <div id="logo">
                <a href="#" sx={logoLink}>
                  MyStore
                </a>
              </div>
            </div>

            {/* Menu starts here */}
            <div id="item-center" sx={itemCenterCSS}>
              {/* Menu overlay is used to create overlay in the background and close the menu when clicked on outside */}
              <div
                className="menu-overlay"
                onClick={toggleMenu}
                ref={menuOverlayRef}
              ></div>

              <nav className="menu" ref={menuRef} sx={menuCSS}>
                {/* Mobile menu header - back button, logo and close button */}
                <MobileMenuHead
                  hideSubMenu={hideSubMenu}
                  toggleMenu={toggleMenu}
                  mobileMenuHeadRef={mobileMenuHeadRef}
                  title={subMenuTitle}
                />

                {/* Menu items */}
                <ul className="menu-main">
                  <li>
                    <a href="#">Home</a>
                  </li>

                  <li className="menu-item-has-children">
                    <a href="#" onClick={() => showSubMenu(1)}>
                      News
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </a>

                    <div
                      className="sub-menu mega-menu mega-menu-column-4"
                      ref={subMenuRefOne}
                    >
                      {/* Image products */}
                      <div className="list-item text-center">
                        <ListItemCard />
                      </div>
                      <div className="list-item text-center">
                        <ListItemCard />
                      </div>
                    </div>
                  </li>

                  <MenuItem
                    menuItemRef={subMenuRefTwo}
                    showSubMenu={showSubMenu}
                  />
                </ul>
              </nav>
            </div>
            {/* Menu ends here */}

            {/* Right items starts here */}
            <div className="item-right" sx={bp > 2 ? itemRight : smItemRight}>
              <a href="">
                <span className="icon">
                  <FaSearch />
                </span>
              </a>
              <a href="">
                <span className="icon">
                  <FaSearch />
                </span>
              </a>
              <a href="">
                {/* <i className="fas fa-shopping-cart"></i> */}
                <span className="icon">
                  <FaShoppingCart />
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
      <section className="banner-section"></section>
    </>
  );
};

export default Header;
