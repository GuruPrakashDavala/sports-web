import { forwardRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const MenuItem = forwardRef((props, ref) => {
  const { showSubMenu } = props;
  return (
    <li className="menu-item-has-children">
      <a href="#" onClick={() => showSubMenu(2)}>
        Multiple category divisions
        <span className="icon">
          <FaAngleDown />
        </span>
      </a>
      <div className="sub-menu mega-menu mega-menu-column-4" ref={ref}>
        <div className="list-item">
          <h4 className="title">Mens fashion</h4>
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
          <h4 className="title">Beauty</h4>
          <ul>
            <li>
              <a href="#"> Product list </a>
            </li>
            <li>
              <a href="#"> Product list </a>
            </li>
          </ul>
        </div>
        <div className="list-item">
          <h4 className="title">Womens fashion</h4>
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
            <li>
              <a href="#"> Product list </a>
            </li>
          </ul>
          <h4 className="title">Furniture</h4>
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
          </ul>
        </div>

        <div className="list-item">
          <h4 className="title">Home, kitchen</h4>
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
          </ul>
        </div>
        <div className="list-item">
          <img src="img/shop1.jpg" alt="shop" />
        </div>
      </div>
    </li>
  );
});

MenuItem.displayName = `MenuItem`;

export default MenuItem;
