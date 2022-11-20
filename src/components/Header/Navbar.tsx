/** @jsxImportSource theme-ui */

import Link from "../../components/Primitives/Link";
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
            background: colors.experimental.blue150,
            color: colors.white,
            cursor: "pointer",
            flexDirection: "column",
            // Experimental hover styles
            // transition: ".25s ease",
            // willChange: "transform",
            // "&:hover": {
            //   opacity: ".875",
            //   transform: "scale(0.985)",
            // },
          }}
        >
          <div
            sx={{
              transition: ".25s ease",
              willChange: "transform",
              "&:hover": {
                opacity: ".875",
                transform: "scale(0.985)",
              },
            }}
          >
            <img
              src="/assets/bat_logo.png"
              alt="logo"
              sx={{ height: "50px", width: "auto", color: colors.white }}
            />
          </div>

          {/* ":hover": {
              transform: translateY(-3px);
              -webkit-transition: -webkit-transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms;
              transition: transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms;
              will-change: transform;
            } */}

          {/* {`<< Header section yet to be created. Click here to go to the homepage`} */}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
