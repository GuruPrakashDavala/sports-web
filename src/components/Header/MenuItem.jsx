/** @jsxImportSource theme-ui */

import { FaAngleDown } from "react-icons/fa";
import Link from "../Primitives/Link";

const MenuItem = (props) => {
  const { showSubMenu, menuItemRef, menuCategory, name } = props;

  const subCategories = menuCategory.data.attributes.data;
  console.log("subCategories");
  console.log(subCategories);

  return (
    <li className="menu-item-has-children">
      <a onClick={() => showSubMenu(2)}>
        <span className="menu-category-title">{name}</span>
        <span className="icon">
          <FaAngleDown />
        </span>
      </a>

      <div className="sub-menu mega-menu mega-menu-column-4" ref={menuItemRef}>
        {subCategories.map((category) => {
          return (
            <div className="list-item" key={category.id}>
              <h4 className="title">{category.name}</h4>
              <ul>
                {category.subcategory.map((category) => (
                  <li key={category.id}>
                    <Link href={category.href}>
                      <>{category.name} </>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="list-item">
          <a href="https://amazon.co.uk">
            <img src="img/t20_logo.png" alt="shop" />
          </a>
        </div>
      </div>
    </li>
  );
};

MenuItem.displayName = `MenuItem`;

export default MenuItem;
