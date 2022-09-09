/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";

type NewscardProps = {
  imageIndex: number;
};

const Newscard = (props: NewscardProps) => {
  const { imageIndex } = props;

  const cardContainer: ThemeUICSSObject = {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#DC0714",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transition: "background-color 400ms cubic-bezier(0.645, 0.045, 0.355, 1)",
    textDecoration: "none",
    willChange: "background-color",
    "&:hover": {
      backgroundColor: "#CA0E14",
      transition:
        "background-color 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
      "> div .info": {
        transform: "translateY(-3px)",
        transition:
          "transform 150ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
        willChange: "transform",
      },
    },
  };

  const cardStyles: ThemeUICSSObject = {
    width: "100%",
    flexDirection: "column",
    paddingX: "15px",
    paddingTop: "15px",
  };

  const cardInfo: ThemeUICSSObject = {
    flexGrow: 1,
    gap: "10px",
    color: "#fff",
    paddingTop: "40px",
    paddingBottom: "20px",
    borderBottom: "1px solid",
    borderBottomColor: "rgba(255, 255, 255, 0.4)",
  };

  const textInfo: ThemeUICSSObject = {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    alignItems: "center",
    justifyContent: "left",
    color: "#fff",
    paddingTop: "10px",
  };

  const cardDetailsTransition: ThemeUICSSObject = {
    transition: "transform 400ms cubic-bezier(0.645, 0.045, 0.355, 1) 100ms",
    willChange: "transform",
  };

  const imageWrapper: ThemeUICSSObject = {
    position: "relative",
    // Image styles
    "> img": {
      display: "block",
      height: "100%",
      width: "100%",
      objectFit: "contain",
    },
    // Icon styles
    "> div": {
      position: "absolute",
      background: "linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.6))",
      width: "100%",
      height: "3rem",
      bottom: "0",
      left: "0",
    },
    "> div p": {
      paddingX: "20px",
    },
  };

  return (
    <div sx={cardContainer}>
      <div sx={cardStyles}>
        <div sx={imageWrapper}>
          <img
            src={
              imageIndex % 2
                ? "/assets/cardimage.png"
                : "/assets/playerimage.png"
            }
            alt="card"
          />

          <div>
            <p sx={{ color: "#fff" }}>Icon</p>
          </div>
        </div>

        <div sx={cardInfo}>
          <div className="info" sx={cardDetailsTransition}>
            <p sx={{ fontSize: "12px" }}>1 HOUR AGO</p>
            <div sx={textInfo}>
              <span sx={{ textTransform: "uppercase" }}>Interview</span>
              <span sx={{ variant: "text.heading5" }}>
                Thiago, student and teacher
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newscard;
