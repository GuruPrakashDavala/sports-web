import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../styles/theme";
/* Header component styles */

export const container = {
  maxWidth: "1200px",
  margin: "auto",
  width: "100%",
};

export const row: ThemeUICSSObject = {
  display: "flex",
  flexWrap: "wrap",
};

export const vCenter: ThemeUICSSObject = {
  alignItems: "center",
};

/* Desktop styles */
export const desktopHeaderStyles: ThemeUICSSObject = {
  display: "block",
  width: "100%",
  position: "relative",
  zIndex: "99",
  borderBottom: "1px solid rgba(0,0,0,.2)",
  padding: 1,
  background: colors.experimental.blue150,
  "> .mobile-menu-trigger": {
    display: "none",
  },
};

export const desktopHeaderItemsLeft: ThemeUICSSObject = {
  flex: "0 0 17%",
};

export const logoLink: ThemeUICSSObject = {
  textDecoration: "none",
  variant: "text.subheading2",
  color: "black",
};

export const desktopHeaderItemsCenter: ThemeUICSSObject = {
  flex: "0 0 66%",
};

const subMenuStyles = {
  position: "absolute",
  zIndex: 500,
  backgroundColor: colors.white,
  paddingX: 2,
  paddingY: 3,
  transition: "all 0.3s ease",
  opacity: 0,
  visibility: "hidden",
  border: "1px solid rgba(0,0,0,.2)",
  // Sub menu global ul li styles. Applies to the list items inside .list-item class
  "> .list-item > ul": {
    marginBottom: 3,
  },
  // should be revised when we render multiple category_list in a single column (flexBasis)
  "> .list-item > ul:last-child": {
    marginBottom: 0,
  },
};

const subMenuListStyles = {
  lineHeight: 1,
  margin: 0,
  display: "block",
  "> a": {
    display: "inline-block",
    paddingY: 1,
    border: "none",
    color: colors.gray100,
    variant: "text.heading4",
    "&:hover": {
      border: "none",
      textDecoration: "underline",
    },
  },
};

const subMenuListItemStyles: ThemeUICSSObject = {
  paddingX: 2,
  "> .title": {
    color: colors.experimental.blue150,
    paddingY: 1,
    variant: "text.subheading4",
    margin: 0,
  },
  "> a img": {
    maxWidth: "100%",
    width: "100%",
    verticalAlign: "middle",
    marginTop: "10px",
  },
};

export const desktopMenuStyles: ThemeUICSSObject = {
  "> ul li": {
    display: "inline-block",
    marginLeft: 1,
    "> a": {
      display: "flex",
      justifyContent: "center",
      textDecoration: "none",
      cursor: "pointer",

      // Arrow icon for categories - Hidden
      ".icon": {
        display: "none",
        justifyContent: "center",
        alignItems: "center",
      },
      "> .menu-category-title": {
        paddingX: 1,
        paddingY: 2,
        variant: "text.subheading4",
        color: "white",
      },
    },
    "&:hover": {
      "> a > .menu-category-title": {
        opacity: 0.8,
      },
    },
    "> .sub-menu": subMenuStyles,
    "> .sub-menu.mega-menu": {
      left: "50%",
      transform: "translateX(-50%)",
      maxHeight: "600px",
      overflowY: "auto",
      "> .list-item": {
        "> ul > li": subMenuListStyles,
      },
    },

    "> .sub-menu.mega-menu-column-1": {
      minWidth: "250px",
      maxWidth: "325px",
      paddingX: 3,
      paddingY: 4,
      "> .list-item": {
        "> ul > li": subMenuListStyles,
      },
    },
    "> .sub-menu.mega-menu-column-2": {
      maxWidth: "450px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      paddingX: 3,
      paddingY: 4,
      "> .list-item": {
        ...subMenuListItemStyles,
        flex: "0 0 50%",
        paddingX: 1,
      },
    },
    "> .sub-menu.mega-menu-column-3": {
      maxWidth: "675px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      paddingX: 3,
      paddingY: 4,
      "> .list-item": {
        ...subMenuListItemStyles,
        flex: "0 0 33.33%",
        paddingX: 1,
      },
    },
    "> .sub-menu.mega-menu-column-4": {
      maxWidth: "900px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      paddingX: 3,
      paddingY: 4,
      "> .list-item": {
        ...subMenuListItemStyles,
        flex: "0 0 25%",
      },
    },
  } as ThemeUICSSObject,

  "> ul li:first-of-type": {
    marginLeft: 5,
  },
  // Show submenu if available when hovered on menu category title
  "> ul li.menu-item-has-children.active": {
    // "&:hover": {
    //   "> .sub-menu": {
    //     marginTop: 0,
    //     visibility: "visible",
    //     opacity: 1,
    //   },
    // },

    "> .sub-menu": {
      marginTop: 0,
      visibility: "visible",
      opacity: 1,
    },
  },
  // Hide mobile menu head on desktop
  "> .mobile-menu-head": {
    display: "none",
  },
};

// Right item disabled
const itemRightIcons = {
  textDecoration: "none",
  fontSize: "16px",
  color: "#555555",
  display: "inline-block",
  marginLeft: "10px",
  transition: "color 0.5s ease",
};

export const desktopHeaderItemsRight: ThemeUICSSObject = {
  flex: "0 0 17%",
  display: "none",
  justifyContent: "flex-end",
  "> a": itemRightIcons,
  "> .mobile-menu-trigger": {
    display: "none",
  },
};

/* Mobile styles */

export const menuOverlayStyles: ThemeUICSSObject = {
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 1098,
  visibility: "hidden",
  opacity: 0,
  transition: "all 0.3s ease",
};

const menuOverlayActiveStyles: ThemeUICSSObject = {
  visibility: "visible",
  opacity: 1,
};

export const smHeaderItemsCenter: ThemeUICSSObject = {
  order: 3,
  flex: "0 0 100%",
  "> .menu.active": {
    transform: "translate(0%)",
  },
  "> .menu-overlay": menuOverlayStyles,
  "> .menu-overlay.active": menuOverlayActiveStyles,
};

/* Mobile menu trigger CSS */
const mobileMenuTrigger: ThemeUICSSObject = {
  display: "flex",
  height: "30px",
  width: "30px",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  "> span": {
    display: "block",
    height: "2px",
    backgroundColor: "white",
    width: "24px",
    position: "relative",
  },
  "> span:before, > span:after": {
    content: '""',
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  "> span:before": {
    top: "-6px",
  },
  "> span:after": {
    top: "6px",
  },
};

export const mobileHeaderItemsLeftAndRight: ThemeUICSSObject = {
  flex: "0 0 auto",
  display: "flex",
  gap: 2,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  "> .mobile-menu-trigger": mobileMenuTrigger,
};

const smItemRight: ThemeUICSSObject = {
  flex: "0 0 auto",
  alignItems: "center",
  display: "none",
  // Disable right icons on mobile
  "> a": {
    display: "none",
  },
};

export const mobileHeaderStyles: ThemeUICSSObject = {
  display: "block",
  width: "100%",
  position: "relative",
  zIndex: "99",
  padding: 1,
  background: colors.experimental.blue150,
};

export const smSubMenuStyles = {
  visibility: "visible",
  opacity: 1,
  position: "absolute",
  boxShadow: "none",
  margin: 0,
  padding: "15px",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  paddingTop: "85px",
  maxWidth: "none",
  minWidth: "auto",
  /* Hide sub menu in iniail state */
  display: "none",
  transform: "translateX(0%)",
  overflowY: "auto",
  zIndex: 500,
  backgroundColor: "white",
  transition: "all 0.3s ease",
  "> .list-item > ul > li > a": {
    display: "block",
    paddingY: 1,
    color: colors.gray100,
    textDecoration: "none",
    textTransform: "capitalize",
    transition: "color 0.3s ease",
    variant: "text.heading4",
    "&:hover": {
      color: colors.experimental.blue150,
      textDecoration: "underline",
    },
  },
  ".list-item > ul": {
    marginBottom: "15px",
  },
  ".list-item > a > img": {
    maxWidth: "100%",
    width: "100%",
    verticalAlign: "middle",
    marginTop: 0,
  },
};

export const mobileMenuStyles: ThemeUICSSObject = {
  position: "fixed",
  width: "320px",
  backgroundColor: "white",
  left: 0,
  top: 0,
  height: "100%",
  overflow: "hidden",
  transform: "translate(-100%)",
  transition: "all 0.3s ease",
  zIndex: "1099",
  "> ul > li": {
    lineHeight: 1,
    margin: 0,
    display: "block",
    "> a": {
      position: "relative",
      textDecoration: "none",
      lineHeight: "50px",
      height: "50px",
      padding: "0 50px 0 15px",
      display: "block",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      transition: "color 0.5s ease",
      "> .icon": {
        position: "absolute",
        height: "50px",
        width: "50px",
        top: 0,
        right: 0,
        textAlign: "center",
        lineHeight: "50px",
        transform: " rotate(-90deg)",
      },
      "> .menu-category-title": {
        color: "black",
        variant: "text.subheading4",
      },
    },
    ".sub-menu.mega-menu, .sub-menu": smSubMenuStyles,
    // Show submenu when active class is attached
    ".sub-menu.active": {
      display: "block",
    },
    ".sub-menu > .list-item > .title": {
      paddingY: 1,
      margin: 0,
      color: colors.experimental.blue150,
    },
    ".sub-menu.mega-menu-column-4 > .list-item.text-center > .title": {
      marginBottom: "20px",
    },
    ".sub-menu.mega-menu-column-4 > .list-item.text-center > a > .title": {
      marginBottom: "20px",
    },
    ".sub-menu.mega-menu-column-4 > .list-item.text-center:last-child > a > .title":
      {
        marginBottom: "0px",
      },
    ".sub-menu.mega-menu-column-4 > .list-item": {
      flex: "0 0 100%",
      padding: 0,
    },
  } as ThemeUICSSObject,
  // Mobile header top bar styles
  ".mobile-menu-head": {
    display: "flex",
    height: "70px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 501,
    position: "sticky",
    backgroundColor: "white",
    top: 0,
    "> .go-back": {
      borderRight: "1px solid rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      color: "#000000",
      fontSize: "16px",
      height: "100%",
      padding: "20px",
      alignItems: "center",
      justifyContent: "center",
      /* Hide go back in initial state */
      display: "none",
      backgroundColor: colors.gray300,
    },
    "> .current-menu-title": {
      variant: "text.subheading3",
    },
    /* Close button */
    "> .mobile-menu-close": {
      color: colors.red200,
      fontSize: "28px",
      borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      display: "flex",
      height: "100%",
      padding: "20px",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  // Mobile menu head active state
  ".mobile-menu-head.active > .go-back": {
    display: "flex",
  },

  /* Menu main layout */
  "> .menu-main": {
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
  },
};
