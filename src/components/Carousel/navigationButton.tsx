/** @jsxImportSource theme-ui */

import { HTMLMotionProps, m } from "framer-motion";
import { ThemeUICSSObject } from "theme-ui";
import VisuallyHidden from "../../utils/visuallyHidden";
import Arrow from "../Icons/Arrow";

const navigationButtonWrapper: ThemeUICSSObject = {
  position: "absolute",
  maxWidth: "115rem",
  height: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  top: "50%",
  transform: "translateY(-50%)",
  left: 0,
  right: 0,
  zIndex: 10,
  pointerEvents: "none",
  // remove below css prop. This is added as a temp soln
  width: "100%",
};

const buttonStyles = (direction: "left" | "right"): ThemeUICSSObject => ({
  display: "flex",
  alignItems: "center",
  p: 0,
  background: "black",
  variant: "text.subheading4",
  boxShadow: "0px 2px 4px rgba(12,12,12,0.17)",
  position: "absolute",
  [direction]: 1,
  borderRadius: "50%",
  width: "100%",
});

const innerButtonWrapper: ThemeUICSSObject = {
  display: "block",
  width: "100%",
  height: "100%",
  m: 0,
  p: 2,
  lineHeight: 0,
};

const buttonClickAreaStyles = (
  direction: "left" | "right"
): ThemeUICSSObject => ({
  display: ["none", null, null, "flex"],
  alignItems: "center",
  p: 0,
  [direction]: 0,
  width: 60,
  height: "100%",
  position: "absolute",
  pointerEvents: "all",
  WebkitTapHighlightColor: "transparent",
});

type CarouselNavigationButtonProps = {
  direction: "left" | "right";
  className: string;
  hiddenText?: string;
  styles?: ThemeUICSSObject;
};

/**
 * Has to be inside a <LazyMotion features={domAnimation}> component to work.
 */
const CarouselNavigationButton = ({
  direction,
  hidden,
  className,
  styles,
  hiddenText,
  ...props
}: CarouselNavigationButtonProps & HTMLMotionProps<"button">): JSX.Element => {
  return (
    <div sx={navigationButtonWrapper}>
      <m.button
        className={className}
        initial={{ transform: "scale(0.95)" }}
        animate={{
          opacity: hidden ? 0 : 1,
        }}
        sx={buttonClickAreaStyles(direction)}
        {...props}
      >
        <m.div
          sx={{
            ...buttonStyles(direction),
            ...styles,
          }}
        >
          <m.span
            sx={innerButtonWrapper}
            whileHover={{
              transform:
                direction === "left" ? "translateX(-5%)" : "translateX(5%)",
            }}
          >
            <Arrow
              styles={{
                transform: direction === "left" ? "rotate(180deg)" : "",
                "& > path": { stroke: "gray300" },
              }}
            />
            <VisuallyHidden>{hiddenText}</VisuallyHidden>
          </m.span>
        </m.div>
      </m.button>
    </div>
  );
};

export default CarouselNavigationButton;
