/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "@theme-ui/css";
import Link from "../Link";
import { get } from "theme-ui";
import { ColorTheme } from "../../../types/modifier";
// import { ColorThemeAll, ColorThemeFrontend } from "../../../types/colorTheme"
// // import Arrow from "../../Icons/arrow"

enum ColorThemeFrontend {
  DEEP_RED = "deepRed",
  WHITE = "white",
  RED = "red",
  BLACK = "black",
  YELLOW = "yellow",
}

type ColorThemeAll = ColorTheme | ColorThemeFrontend;

export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  QUARTERNARY = "quarternary",
}

export type ButtonProps = {
  label: string;
  href?: string | null;
  onClick?: () => void;
  external?: boolean | undefined;
  variant?: ButtonVariants;
  theme?: ColorThemeAll;
  inverse?: boolean;
  styles?: ThemeUICSSObject;
  disabled?: boolean;
};

const buttonDefaults = {
  display: "inline-flex",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "left",
  ":focus-visible": {
    outline: "3px solid",
    outlineColor: "gray200",
    outlineOffset: 0,
  },
};

export const buttons = {
  primary: {
    ...buttonDefaults,
    variant: "text.subheading3",
    width: "100%",
    py: [3],
    px: [3],
    pb: [5],
    alignItems: "center",
  },
  secondary: {
    ...buttonDefaults,
    variant: "text.subheading3",
    width: "100%",
    p: [3],
    alignItems: "center",
  },
  tertiary: { ...buttonDefaults, variant: "text.subheading4", py: "5px" },
};

const buttonHoverDefaults = (inverse: boolean): ThemeUICSSObject => ({
  transition: (t) => `background-color 400ms ${get(t, "easings.easeInOut")}`,
  "@media (hover: hover) and (pointer: fine)": {
    "& svg": {
      transition: (t) => `transform 400ms ${get(t, "easings.easeInOut")}`,
      transform: inverse ? "rotate(180deg)" : null,
    },
    "&:hover svg": {
      transition: (t) => `transform 150ms ${get(t, "easings.easeInOut")}`,
      transform: inverse ? "rotate(180deg) translateX(4px)" : "translateX(4px)",
    },
  },
});

const buttonHoverBackgrounds = {
  transition: (t: any) => `all 150ms ${get(t, "easings.easeInOut")}`,
};

const getTextColors = (theme: ColorThemeAll): ThemeUICSSObject => {
  switch (theme) {
    case ColorThemeFrontend.BLACK:
      return {
        color: "white",
        backgroundColor: "black",
        "@media (any-hover: hover)": {
          "&:hover": { backgroundColor: "gray100", ...buttonHoverBackgrounds },
        },
        ":disabled": {
          "@media (any-hover: hover)": { "&:hover": { cursor: "not-allowed" } },
          backgroundColor: "gray200",
          color: "gray100",
        },
      };
    case ColorThemeFrontend.RED:
      return {
        color: "white",
        backgroundColor: "red100",
        "@media (any-hover: hover)": {
          "&:hover": { backgroundColor: "red200", ...buttonHoverBackgrounds },
        },
      };
    case ColorTheme.DARK:
      return {
        color: "white",
        "@media (any-hover: hover)": { "&:hover": { color: "white100" } },
      };
    case ColorThemeFrontend.WHITE:
      return {
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        "@media (any-hover: hover)": {
          "&:hover": { backgroundColor: "gray300", ...buttonHoverBackgrounds },
        },
      };
    case ColorTheme.LIGHT:
    default:
      return {
        color: "gray100",
        "@media (any-hover: hover)": { "&:hover": { color: "gray200" } },
      };
  }
};

export const completeButtonStyles = (
  variant: ButtonVariants = ButtonVariants.PRIMARY,
  theme: ColorThemeAll = ColorTheme.LIGHT,
  disabled = false,
  inverse = false
): ThemeUICSSObject => ({
  variant: `buttons.${variant}`,
  ...(disabled ? {} : buttonHoverDefaults(inverse)),
  ...getTextColors(theme),
});

const ButtonIconAndLabel = (props: {
  label: string;
  inverse: boolean;
}): JSX.Element => {
  const { inverse, label } = props;
  return (
    <>
      {inverse ? (
        <>{/* <Arrow styles={{ transform: "rotate(180deg)" }} /> {label} */}</>
      ) : (
        <>{/* {label} <Arrow /> */}</>
      )}
    </>
  );
};

const LinkButton = (props: ButtonProps): JSX.Element => {
  const {
    href,
    onClick,
    variant,
    theme,
    styles,
    label,
    inverse = false,
    external,
    disabled,
  } = props;

  return (
    <Link
      //   external={external}
      href={href || "#"}
      //   onClick={() => {
      //     if (!disabled && onClick) onClick;
      //   }}
      //   onKeyDown={(e) => {
      //     if (disabled) {
      //       return;
      //     }

      //     if (e.key === "Enter" && onClick) {
      //       onClick();
      //     }
      //   }}
      styles={{
        ...completeButtonStyles(variant, theme, disabled, inverse),
        ...styles,
      }}
    >
      <ButtonIconAndLabel inverse={inverse} label={label} />
    </Link>
  );
};

const Button = (props: ButtonProps): JSX.Element => {
  const {
    label,
    href,
    external,
    variant = ButtonVariants.PRIMARY,
    theme = ColorTheme.LIGHT,
    styles,
    inverse = false,
    onClick,
    disabled,
  } = props;

  if (!href) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        sx={{
          ...completeButtonStyles(variant, theme, disabled, inverse),
          ...styles,
        }}
      >
        <ButtonIconAndLabel inverse={inverse} label={label} />
      </button>
    );
  }

  return (
    <LinkButton
      disabled={disabled}
      external={external}
      onClick={onClick}
      href={href || "#"}
      variant={variant}
      theme={theme}
      styles={styles}
      label={label}
      inverse={inverse}
    />
  );
};

export default Button;
