/** @jsxImportSource theme-ui */

import { FaAngleDown } from "react-icons/fa";

const MenuItem = (props) => {
  const { showSubMenu, menuItemRef } = props;
  const categories = ["International", "Mens", "Womens"];
  return (
    <li className="menu-item-has-children">
      <a onClick={() => showSubMenu(2)}>
        <span className="menu-category-title">Multiple category divisions</span>
        <span className="icon">
          <FaAngleDown />
        </span>
      </a>
      <div className="sub-menu mega-menu mega-menu-column-4" ref={menuItemRef}>
        {categories.map((category, index) => {
          return (
            <div className="list-item" key={index}>
              <h4 className="title">{category}</h4>
              <ul>
                <li>
                  <a href="#"> Product list </a>
                </li>
                <li>
                  <a href="#"> Product list </a>
                </li>
                <li>
                  <a href="#"> Product list </a>
                </li>
                <li>
                  <a href="#"> Product list </a>
                </li>
                <li>
                  <a href="#"> Product list </a>
                </li>
              </ul>

              {index === 1 && (
                <>
                  <h4 className="title">{category}</h4>
                  <ul>
                    <li>
                      <a href="#"> Product list </a>
                    </li>
                    <li>
                      <a href="#"> Product list </a>
                    </li>
                    <li>
                      <a href="#"> Product list </a>
                    </li>
                    <li>
                      <a href="#"> Product list </a>
                    </li>
                    <li>
                      <a href="#"> Product list </a>
                    </li>
                  </ul>
                </>
              )}
            </div>
          );
        })}

        <div className="list-item">
          <a href="https://amazon.co.uk">
            <img src="img/icc.png" alt="shop" />
          </a>
        </div>
      </div>
    </li>
  );
};

MenuItem.displayName = `MenuItem`;

export default MenuItem;
