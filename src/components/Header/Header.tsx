/** @jsxImportSource theme-ui */

import {
  createRef,
  useEffect,
  useState,
  useRef,
  RefObject,
  Fragment,
} from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import MobileMenuHead from "./MobileMenuHead";
import Link from "../Primitives/Link";
import {
  desktopHeaderItemsCenter,
  desktopHeaderItemsLeft,
  desktopHeaderStyles,
  desktopMenuStyles,
  row,
  vCenter,
  container,
  logoLink,
  mobileMenuStyles,
  mobileHeaderStyles,
  mobileHeaderItemsLeftAndRight,
  smHeaderItemsCenter,
  AppHeader,
} from "../../utils/header";
import { useRouter } from "next/router";
import MenuListItem from "./MenuListItem";

const Header = (props: { appHeader: AppHeader }) => {
  const { appHeader } = props;
  console.log(appHeader);
  const headerItems = appHeader.HeaderItems;

  const elementsRef = useRef(headerItems.map(() => createRef()));
  console.log("elementsRef");
  console.log(elementsRef);

  const bp = useBreakpointIndex();
  // DOM Refs
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

  const router = useRouter();

  // Mobile utils for opening the sidebar
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

  const showSubMenu = (
    subMenuRef: RefObject<HTMLDivElement>,
    title: string
  ): void => {
    if (menu && !menu.classList.contains("active")) {
      return;
    }

    if (!subMenuRef.current || !mobileMenuHeadRef.current) {
      return;
    }

    setActiveSubMenu(subMenuRef.current);
    subMenuRef.current.classList.add("active");
    subMenuRef.current.style.animation = "slideLeft 0.3s ease forwards";
    setSubMenuTitle(title);
    mobileMenuHeadRef.current.classList.add("active");
  };

  const hideSubMenu = (): void => {
    if (activeSubMenu && mobileMenuHeadRef.current) {
      activeSubMenu.style.animation = "slideRight 0.5s ease forwards";
      setTimeout(() => {
        activeSubMenu.classList.remove("active");
      }, 300);
      setSubMenuTitle(undefined);
      mobileMenuHeadRef.current.classList.remove("active");
      setActiveSubMenu(undefined);
    }
  };

  const hideMainMenu = (): void => {
    if (documentBody && menu && menu.classList.contains("active")) {
      menu.classList.remove("active");
      documentBody.style.overflow = "visible";
    }

    if (
      menuOverlayRef.current &&
      menuOverlayRef.current.classList.contains("active")
    ) {
      menuOverlayRef.current.classList.remove("active");
    }
  };

  useEffect(() => {
    if (bp > 2) {
      hideMainMenu();
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

  const headerCSS = bp > 2 ? desktopHeaderStyles : mobileHeaderStyles;
  const itemLeftCSS =
    bp > 2 ? desktopHeaderItemsLeft : mobileHeaderItemsLeftAndRight;
  const itemCenterCSS = bp > 2 ? desktopHeaderItemsCenter : smHeaderItemsCenter;
  const menuCSS = bp > 2 ? desktopMenuStyles : mobileMenuStyles;

  /*
  Notes:
  1. span tag inside .mobile-menu-trigger is used to place hamburger icon via vanilla CSS 
  */

  return (
    <header sx={headerCSS}>
      <div sx={container}>
        <div sx={{ ...row, ...vCenter }}>
          <div sx={itemLeftCSS}>
            <div className="mobile-menu-trigger" onClick={toggleMenu}>
              <span></span>
            </div>

            <div id="logo">
              <Link href="/" styles={logoLink}>
                <img
                  src="/assets/bat_logo.png"
                  alt="cricfanatic"
                  sx={{ height: "45px", width: "auto" }}
                />
              </Link>
            </div>
          </div>

          {/* Menu starts here */}
          <div sx={itemCenterCSS}>
            {/* Menu overlay is used to create overlay in the background and close the menu when clicked on outside */}
            <div
              className="menu-overlay"
              onClick={toggleMenu}
              ref={menuOverlayRef}
            ></div>

            <nav className="menu" ref={menuRef} sx={menuCSS}>
              <MobileMenuHead
                hideSubMenu={hideSubMenu}
                toggleMenu={toggleMenu}
                mobileMenuHeadRef={mobileMenuHeadRef}
                title={subMenuTitle}
              />

              {/* Menu items */}
              <ul className="menu-main">
                {headerItems.map((headerItem, index) => {
                  const listItems =
                    headerItem.menucategory.data?.attributes.category_items;
                  return (
                    <Fragment key={headerItem.id}>
                      {headerItem.menucategory.data && listItems ? (
                        <MenuListItem
                          subMenuRef={elementsRef.current[index]}
                          showSubMenu={showSubMenu}
                          hideSubMenu={hideSubMenu}
                          hideMainMenu={hideMainMenu}
                          listItems={listItems}
                          title={headerItem.name}
                        />
                      ) : (
                        <li key={headerItem.id} onClick={hideMainMenu}>
                          <Link href={headerItem.href ?? ``}>
                            <span className="menu-category-title">
                              {headerItem.name}
                            </span>
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  );
                })}

                {/* <li className="menu-item-has-children">
                  <a onClick={() => showSubMenu(1)}>
                    <span className="menu-category-title">News</span>
                    <span className="icon">
                      <FaAngleDown />
                    </span>
                  </a>

                  <div
                    className="sub-menu mega-menu mega-menu-column-4"
                    ref={subMenuRefOne}
                  >
                    <div className="list-item">
                      <ListItemCard />
                    </div>

                    <div className="list-item">
                      <ListItemCard />
                    </div>

                    <div className="list-item">
                      <ListItemCard />
                    </div>

                    <div className="list-item">
                      <ListItemCard />
                    </div>
                  </div>
                </li>

                <MenuItem
                  menuItemRef={subMenuRefTwo}
                  showSubMenu={showSubMenu}
                  name={fixtureAndResults.name}
                  menuCategory={fixtureAndResults.menucategory}
                /> */}
              </ul>
            </nav>
          </div>

          {/* Menu ends here */}

          {/* Right items starts here */}

          {/* <div className="item-right" sx={itemRightCSS}>
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
                <span className="icon">
                  <FaShoppingCart />
                </span>
              </a>
            </div> */}

          {/* Right items ends here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
