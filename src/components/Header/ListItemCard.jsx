/** @jsxImportSource theme-ui */

const listItemCardStyles = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "> .title": {
    color: "red",
  },
};

const ListItemCard = () => {
  return (
    <a href="" sx={listItemCardStyles}>
      <img src="img/t20_logo.png" alt="new product" className="imgHeight" />
      <h4 className="title">Product 1</h4>
    </a>
  );
};

export default ListItemCard;
