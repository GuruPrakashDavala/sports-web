/** @jsxImportSource theme-ui */

import Link from "next/link";
import { colors } from "../../styles/theme";
import AdBlock, { AdBlockVariant } from "../AdBlock";

const Navbar = () => {
  return (
    <div
      sx={
        {
          // position: "fixed",
          // top: 0,
        }
      }
    >
      <div
        sx={
          {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // height: "50px",
            // borderBottom: "1px solid #f3f3f3",
            // background: colors.gray300,
          }
        }
      >
        {/* <AdBlock variant={AdBlockVariant.HORIZONTAL} /> */}
      </div>
      <Link href={"/"}>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            background: colors.red200,
            color: colors.white,
            cursor: "pointer",
          }}
        >
          {`<< Header section yet to be created. Click here to go to the homepage`}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
