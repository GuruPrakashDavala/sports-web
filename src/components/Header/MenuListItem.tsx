/** @jsxImportSource theme-ui */

import { FaAngleDown } from "react-icons/fa";
import Link from "../Primitives/Link";
import { createRef, useEffect } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";

const MenuListItem = (props: any) => {
  const {
    showSubMenu,
    hideSubMenu,
    hideMainMenu,
    subMenuRef,
    listItems,
    title,
  } = props;
  const menuItemRef = createRef<HTMLLIElement>();

  const closeMenu = () => {
    // Below if condition is only for desktop
    if (
      menuItemRef.current &&
      menuItemRef.current.classList.contains("active")
    ) {
      menuItemRef.current.classList.remove("active");
    }
    // Mobile
    hideSubMenu();
    hideMainMenu();
  };

  // Desktop: on Mouse Hover
  const openSubMenu = () => {
    console.log("onMouseHover");
    console.log(menuItemRef?.current?.classList);
    if (
      menuItemRef.current &&
      !menuItemRef.current.classList.contains("active")
    ) {
      menuItemRef.current.classList.add("active");
    }
  };
  const bp = useBreakpointIndex();

  useEffect(() => {
    closeMenu();
  }, [bp]);

  return (
    <li
      className="menu-item-has-children"
      ref={menuItemRef}
      onMouseOver={bp > 2 ? openSubMenu : undefined}
      onMouseOut={bp > 2 ? closeMenu : undefined}
    >
      <a onClick={() => showSubMenu(subMenuRef, title)}>
        <span className="menu-category-title">{title}</span>
        <span className="icon">
          <FaAngleDown />
        </span>
      </a>

      <div className="sub-menu mega-menu mega-menu-column-4" ref={subMenuRef}>
        {/* <div className="list-item">
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
        </div> */}

        {listItems.map((category: any) => {
          return (
            category.type === "list" && (
              <div className="list-item" key={category.id}>
                <h4 className="title">{category.name}</h4>
                <ul>
                  {category.subcategory.map((category: any) => (
                    <li key={category.id} onClick={closeMenu}>
                      <Link href={category.href}>
                        <>{category.name} </>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          );
        })}
      </div>
    </li>
  );
};

export default MenuListItem;
