/** @jsxImportSource theme-ui */

import Image from "next/legacy/image";
import { colors } from "../../styles/theme";
import SectionWrapper from "../Wrappers/SectionWrapper";

const PromoBlock = (): JSX.Element => {
  return (
    <SectionWrapper>
      <div sx={{ maxWidth: "105rem", margin: "0 auto" }}>
        <div
          sx={{
            padding: "60px",
            display: "grid",
            background: colors.green,
            width: "100%",
            height: "100%",
            gridTemplateColumns: "0.5fr 0.5fr",
            gridTemplateRows: "min-content min-content",
            rowGap: "60px",
          }}
        >
          <div
            sx={{ gridColumn: " 1 / auto", gridArea: "1 / 1 / auto / auto" }}
          >
            <div
              sx={{
                color: colors.white,
                textTransform: "none",
                variant: "text.heading1",
              }}
            >
              <span
                sx={{
                  display: "inline-block",
                  variant: "text.heading6",
                  marginRight: "0.5rem",
                }}
              >
                Our guides to everything you need for visiting Anfield -
                including access, facilities, accessibility, your journey and
                more.
              </span>
            </div>
          </div>
          <div
            sx={{
              maxWidth: "280px",
              maxHeight: "280px",
              gridArea: "span 2 / 2 / auto / auto",
              width: "75%",
              placeSelf: "end",
            }}
          >
            <div
              sx={{
                display: "block",
                overflow: "hidden",
                position: "relative",
                margin: "0px",
                borderRadius: "50%",
              }}
            >
              <Image
                src={"/assets/pexel.jpg"}
                layout="responsive"
                objectFit="cover"
                alt="image"
                height={100}
                width={100}
              />
            </div>
          </div>
          <a
            sx={{
              alignSelf: "end",
              maxWidth: "380px",
              gridRow: "2/auto",
              gridArea: "3 / 1 / auto / auto",
              padding: "20px",
              background: colors.black,
              color: colors.white,
            }}
          >
            View here - button component
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PromoBlock;
