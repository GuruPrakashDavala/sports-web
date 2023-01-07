/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { Fragment } from "theme-ui/jsx-runtime";
import { colors } from "../../styles/theme";
import { ImageType as ImageT } from "../../types/article";
import { renderImage } from "../../utils/util";
import Link from "../Primitives/Link";

const listItemImageCardStyles: ThemeUICSSObject = {
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

type ListItemCardProps = {
  image: { data: ImageT };
  href: string;
  name: string;
  closeMenu: () => void;
};

const ListItemImageCard = (props: ListItemCardProps) => {
  const { image, href, name, closeMenu } = props;

  return (
    <Link href={href} styles={listItemImageCardStyles}>
      <Fragment>
        {/* Click event should be moved to the wrapper */}
        <img src={renderImage(image.data)} alt={name} onClick={closeMenu} />
        <h4 className="title">{name}</h4>
      </Fragment>
    </Link>
  );
};

export default ListItemImageCard;
