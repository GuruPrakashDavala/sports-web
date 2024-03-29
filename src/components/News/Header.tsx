/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import Image from "next/image";
import { colors } from "../../styles/theme";

type NewsHeaderProps = {
  title: string;
  imageSrc: string;
  category?: string;
};

const NewsHeader = ({
  title,
  category,
  imageSrc,
}: NewsHeaderProps): JSX.Element => {
  const bp = useBreakpointIndex();
  // const articleHeaderImageHeight = bp > 2 ? 54 : 74;
  const articleHeaderImageHeight = bp > 2 ? 54 : 74;

  return (
    <div>
      <div>
        <Image
          src={imageSrc}
          layout="responsive"
          objectFit="cover"
          alt="image"
          height={articleHeaderImageHeight}
          width={100}
        />
      </div>

      {bp >= 2 ? (
        <div
          sx={{
            top: "42rem",
            position: "sticky",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            sx={{
              display: "block",
              position: "absolute",
              height: "25rem",
              background:
                "linear-gradient(to bottom, rgba(12,12,12, 0), rgba(12,12,12, 0.6))",
              zIndex: 9,
              width: "100%",
              left: 0,
              bottom: 0,
            }}
          ></div>
          <h1
            sx={{
              variant: "text.heading1",
              fontSize: [4, null, 7, 8],
              paddingY: "60px",
              paddingX: "15px",
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              transform: "translateX(-50%)",
              left: "50%",
              bottom: 0,
              color: colors.white,
              width: "calc(100% - 120px)",
              zIndex: "10",
            }}
          >
            <span
              sx={{
                display: "inline-block",
                marginRight: "0.5rem",
                color: colors.white,
                variant: "text.subheading1",
                fontSize: [null, null, 6, "36px"],
              }}
            >
              {category}
            </span>
            {title}
          </h1>
        </div>
      ) : (
        // Mobile news header title
        <h2 sx={{ paddingX: 2, paddingY: 3, paddingBottom: 0 }}>
          {category && (
            <span
              sx={{
                display: "inline-block",
                marginRight: "0.5rem",
                variant: "text.subheading3",
              }}
            >
              {category}
            </span>
          )}

          <span sx={{ variant: "text.heading2" }}>{title}</span>
        </h2>
      )}
    </div>
  );
};

export default NewsHeader;
