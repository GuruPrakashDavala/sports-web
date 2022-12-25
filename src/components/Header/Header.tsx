/** @jsxImportSource theme-ui */

import { createRef, useEffect, useState } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import ListItemCard from "./ListItemCard";
import { FaAngleDown, FaSearch, FaShoppingCart } from "react-icons/fa";
import MenuItem from "./MenuItem";
import MobileMenuHead from "./MobileMenuHead";
import { colors } from "../../styles/theme";
import { ThemeUICSSObject } from "theme-ui";

const Header = () => {
  const bp = useBreakpointIndex();
  // Refs
  const menuRef = createRef<HTMLDivElement>();
  const menuOverlayRef = createRef<HTMLDivElement>();
  const subMenuRefOne = createRef<HTMLDivElement>();
  const subMenuRefTwo = createRef<HTMLDivElement>();
  const mobileMenuHeadRef = createRef<HTMLDivElement>();

  // State variables
  const [documentBody, setDocumentBody] = useState<HTMLElement | undefined>(
    undefined
  );
  const [menu, setMenu] = useState<undefined | HTMLElement>(undefined);
  const [subMenuTitle, setSubMenuTitle] = useState<undefined | string>(
    undefined
  );
  const [activeSubMenu, setActiveSubMenu] = useState<undefined | HTMLElement>(
    undefined
  );

  // Mobile utils for opening the sidebar
  const showSubMenu = (subMenuIndex: number): void => {
    if (menu && !menu.classList.contains("active")) {
      return;
    }

    if (
      !subMenuRefOne.current ||
      !subMenuRefTwo.current ||
      !mobileMenuHeadRef.current
    ) {
      return;
    }

    switch (subMenuIndex) {
      case 1: {
        setActiveSubMenu(subMenuRefOne.current);
        subMenuRefOne.current.classList.add("active");
        subMenuRefOne.current.style.animation = "slideLeft 0.5s ease forwards";
        setSubMenuTitle("News");
        mobileMenuHeadRef.current.classList.add("active");
        break;
      }
      case 2: {
        setActiveSubMenu(subMenuRefTwo.current);
        subMenuRefTwo.current.classList.add("active");
        subMenuRefTwo.current.style.animation = "slideLeft 0.5s ease forwards";
        setSubMenuTitle("Multiple categories");
        mobileMenuHeadRef.current.classList.add("active");
        break;
      }
      default:
        return;
    }
  };

  const toggleMenu = (): void => {
    if (documentBody && menu && menuOverlayRef.current) {
      if (menu.classList.contains("active")) {
        documentBody.style.overflow = "visible";
      } else {
        documentBody.style.overflow = "hidden";
      }
      menu.classList.toggle("active");
      menuOverlayRef.current.classList.toggle("active");
    }

    if (activeSubMenu && activeSubMenu.classList.contains("active")) {
      hideSubMenu();
    }
  };

  const hideSubMenu = (): void => {
    if (activeSubMenu && mobileMenuHeadRef.current) {
      activeSubMenu.style.animation = "slideRight 0.5s ease forwards";
      setTimeout(() => {
        activeSubMenu.classList.remove("active");
      }, 300);
      setSubMenuTitle("");
      mobileMenuHeadRef.current.classList.remove("active");
      setActiveSubMenu(undefined);
    }
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
    if (document) {
      setDocumentBody(document.querySelector("body") as HTMLElement);
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMenu(menuRef.current);
    }
  }, [menuRef]);

  const row: ThemeUICSSObject = {
    display: "flex",
    flexWrap: "wrap",
  };

  // Desktop styles

  const container = {
    maxWidth: "1200px",
    margin: "auto",
    width: "100%",
  };

  const subMenuListStyles = {
    lineHeight: 1,
    margin: 0,
    display: "block",
    "> a": {
      display: "inline-block",
      paddingY: "5px",
      border: "none",
      color: colors.gray100,
      variant: "text.body4",
      "&:hover": {
        border: "none",
        textDecoration: "underline",
      },
    },
  };

  const subMenuStyles = {
    position: "absolute",
    zIndex: 500,
    backgroundColor: colors.white,
    // boxShadow: "-2px 2px 70px -25px rgba(0, 0, 0, 0.3)",
    paddingX: 2,
    paddingY: 3,
    transition: "all 0.3s ease",
    // marginTop: "25px",
    opacity: 0,
    visibility: "hidden",
    border: "1px solid rgba(0,0,0,.2)",
    // Sub menu global ul li styles. Applies to the list items inside .list-item class
    "> .list-item > ul": {
      marginBottom: 3,
    },
    "> .single-column-menu": {
      minWidth: "280px",
      maxWidth: "350px",
    },
  };

  const menuStyles: ThemeUICSSObject = {
    "> ul li": {
      display: "inline-block",
      marginLeft: 1,
      "> a": {
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
        borderBottom: "4px solid transparent",
        transition: "left .2s ease-out,border-color .1s ease-in",
        // Arrow icon for categories - Hidden
        ".icon": {
          display: "none",
          justifyContent: "center",
          alignItems: "center",
        },
        "> .menu-category-title": {
          paddingX: 1,
          paddingY: 2,
          variant: "text.subheading4",
          color: "black",
        },
      },
      "&:hover": {
        "> a": {
          borderBottom: "4px solid",
          borderColor: colors.experimental.blue150,
        },
      },
      "> .sub-menu": subMenuStyles,
      "> .sub-menu.mega-menu": {
        left: "50%",
        transform: "translateX(-50%)",
        "> .list-item": {
          "> ul > li": subMenuListStyles,
        },
      },

      "> .sub-menu.mega-menu-column-4": {
        maxWidth: "900px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        paddingX: 3,
        paddingY: 4,
        // List item styles
        "> .list-item": {
          flex: "0 0 25%",
          paddingX: 2,
          "> .title": {
            color: colors.experimental.blue150,
            paddingY: 1,
            variant: "text.subheading4",
            margin: 0,
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
    } as ThemeUICSSObject,
    // Show submenu if available when hovered on menu category title
    "> ul li.menu-item-has-children": {
      "&:hover": {
        "> .sub-menu": {
          marginTop: 0,
          visibility: "visible",
          opacity: 1,
        },
      },
    },
    // Hide mobile menu head on desktop
    "> .mobile-menu-head": {
      display: "none",
    },
  };

  const headerStyles: ThemeUICSSObject = {
    display: "block",
    width: "100%",
    position: "relative",
    zIndex: "99",
    borderBottom: "1px solid rgba(0,0,0,.2)",
    "> .mobile-menu-trigger": {
      display: "none",
    },
  };

  const itemLeft: ThemeUICSSObject = {
    flex: "0 0 17%",
  };

  // Right item disabled
  const itemRightIcons = {
    textDecoration: "none",
    fontSize: "16px",
    color: "#555555",
    display: "inline-block",
    marginLeft: "10px",
    transition: "color 0.5s ease",
  };

  const itemRight: ThemeUICSSObject = {
    flex: "0 0 17%",
    // display: "flex",
    display: "none",
    justifyContent: "flex-end",
    "> a": itemRightIcons,
    "> .mobile-menu-trigger": {
      display: "none",
    },
  };

  const logoLink: ThemeUICSSObject = {
    textDecoration: "none",
    variant: "text.subheading2",
    color: "black",
  };

  const headerItemCenter: ThemeUICSSObject = {
    flex: "0 0 66%",
  };

  // Mobile header styles

  const menuOverlayStyles: ThemeUICSSObject = {
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

  const menuOverlayActiveStyles: ThemeUICSSObject = {
    visibility: "visible",
    opacity: 1,
  };

  const smHeaderItemCenter: ThemeUICSSObject = {
    order: 3,
    flex: "0 0 100%",
    "> .menu.active": {
      transform: "translate(0%)",
    },
    "> .menu-overlay": menuOverlayStyles,
    "> .menu-overlay.active": menuOverlayActiveStyles,
  };

  /* Mobile menu trigger CSS */
  const mobileMenuTrigger: ThemeUICSSObject = {
    display: "flex",
    height: "30px",
    width: "30px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    "> span": {
      display: "block",
      height: "2px",
      backgroundColor: "white",
      width: "24px",
      position: "relative",
    },
    "> span:before, > span:after": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    "> span:before": {
      top: "-6px",
    },
    "> span:after": {
      top: "6px",
    },
  };

  const smHeaderItemLeftAndRight: ThemeUICSSObject = {
    flex: "0 0 auto",
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    "> .mobile-menu-trigger": mobileMenuTrigger,
  };

  const smItemRight: ThemeUICSSObject = {
    flex: "0 0 auto",
    alignItems: "center",
    display: "none",
    // Disable right icons on mobile
    "> a": {
      display: "none",
    },
  };

  const vCenter: ThemeUICSSObject = {
    alignItems: "center",
    ...(bp < 3 ? { justifyContent: "space-between" } : {}),
  };

  const smHeaderStyles: ThemeUICSSObject = {
    display: "block",
    width: "100%",
    position: "relative",
    zIndex: "99",
    padding: 1,
    background: colors.experimental.blue150,
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
    "> .list-item > ul > li > a": {
      display: "block",
      paddingY: 1,
      color: colors.gray100,
      textDecoration: "none",
      textTransform: "capitalize",
      transition: "color 0.3s ease",
      variant: "text.heading4",
      "&:hover": {
        color: colors.experimental.blue150,
        textDecoration: "underline",
      },
    },
    ".list-item > ul": {
      marginBottom: "15px",
    },
    ".list-item > a > img": {
      maxWidth: "100%",
      width: "100%",
      verticalAlign: "middle",
      marginTop: 0,
    },
  };

  const smMenuStyles: ThemeUICSSObject = {
    position: "fixed",
    width: "320px",
    backgroundColor: "white",
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
        position: "relative",
        textDecoration: "none",
        lineHeight: "50px",
        height: "50px",
        padding: "0 50px 0 15px",
        display: "block",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        transition: "color 0.5s ease",
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
        "> .menu-category-title": {
          color: "black",
          variant: "text.subheading4",
        },
      },
      ".sub-menu.mega-menu, .sub-menu": smSubMenuStyles,
      // Show submenu when active class is attached
      ".sub-menu.active": {
        display: "block",
      },
      ".sub-menu.mega-menu-column-4 > .list-item > .title": {
        paddingY: 1,
        margin: 0,
        color: colors.experimental.blue150,
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
    } as ThemeUICSSObject,
    // Mobile header top bar styles
    ".mobile-menu-head": {
      display: "flex",
      height: "70px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 501,
      position: "sticky",
      backgroundColor: "white",
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
        backgroundColor: colors.gray300,
      },
      "> .current-menu-title": {
        variant: "text.subheading3",
      },
      /* Close button */
      "> .mobile-menu-close": {
        color: colors.red200,
        fontSize: "28px",
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
      <header sx={headerCSS}>
        <div id="container" sx={container}>
          <div id="row v-center" sx={{ ...row, ...vCenter }}>
            {/* Left item - Brand logo section */}
            <div id="item-left" sx={itemLeftCSS}>
              {/* Mobile menu trigger */}
              <div className="mobile-menu-trigger" onClick={toggleMenu}>
                <span></span>
              </div>

              <div id="logo">
                <a href="#" sx={logoLink}>
                  <img
                    src="/assets/bat_logo.png"
                    alt="logo"
                    sx={{ height: "40px", width: "auto", color: colors.white }}
                  />
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
                    <a href="#">
                      <span className="menu-category-title">Home</span>
                    </a>
                  </li>

                  <li className="menu-item-has-children">
                    <a href="#" onClick={() => showSubMenu(1)}>
                      <span className="menu-category-title">News</span>
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
