// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const MenuItem = () => {
  return (
    <li className="menu-item-has-children">
      <a href="#">
        Multiple category divisions
        <span className="icon">
          {/* <FontAwesomeIcon icon={faAngleDown} /> */}
        </span>
      </a>
      <div className="sub-menu mega-menu mega-menu-column-4">
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
          <h4 className="title">Home and kitchen</h4>
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
          <img src="img/shop1.jpg" alt="shop" />
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
