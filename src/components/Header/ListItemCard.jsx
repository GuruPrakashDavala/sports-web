/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";

const listItemCardStyles = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  "> .title": {
    paddingY: 1,
    color: colors.experimental.blue150,
  },
};

const ListItemCard = () => {
  return (
    <a href="" sx={listItemCardStyles}>
      <img src="img/t20_logo.png" alt="new product" />
      <h4 className="title">Product 1</h4>
    </a>
  );
};

export default ListItemCard;
