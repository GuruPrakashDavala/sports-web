/** @jsxImportSource theme-ui */

import { RefObject } from "react";
import { FaAngleDown } from "react-icons/fa";
import Link from "../Primitives/Link";
import { createRef, useEffect } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import {
  CategoryListItemType as CategoryListItemT,
  CategoryImageType as CategoryImageT,
} from "../../types/header";
import ListItemImageCard from "./ListItemImageCard";

type MenuListItemProps = {
  showSubMenu: (subMenuRef: RefObject<HTMLDivElement>, title: string) => void;
  hideSubMenu: () => void;
  hideMainMenu: () => void;
  subMenuRef: RefObject<HTMLDivElement>;
  listItems: (CategoryImageT | CategoryListItemT)[];
  title: string;
};

const MenuListItem = (props: MenuListItemProps) => {
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

  const subMenuClass =
    listItems.length === 4
      ? `mega-menu mega-menu-column-4`
      : listItems.length === 3
      ? `mega-menu mega-menu-column-3`
      : listItems.length === 2
      ? `mega-menu mega-menu-column-2`
      : listItems.length === 1
      ? `mega-menu-column-1`
      : null;

  return (
    <li
      className="menu-item-has-children"
      ref={menuItemRef}
      onMouseOver={bp > 2 ? openSubMenu : undefined}
      onMouseOut={bp > 2 ? closeMenu : undefined}
    >
      <a onClick={bp > 2 ? undefined : () => showSubMenu(subMenuRef, title)}>
        <span className="menu-category-title">{title}</span>
        <span className="icon">
          <FaAngleDown />
        </span>
      </a>

      <div className={`sub-menu ${subMenuClass}`} ref={subMenuRef}>
        {listItems.map((category, index) => {
          return category.type === "list" ? (
            <div className="list-item" key={index}>
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
          ) : (
            <div className="list-item" key={index}>
              <ListItemImageCard
                image={category.image}
                name={category.name}
                href={category.href}
                closeMenu={closeMenu}
              />
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default MenuListItem;
