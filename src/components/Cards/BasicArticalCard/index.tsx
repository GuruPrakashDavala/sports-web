/** @jsxImportSource theme-ui */

import { IonCard, IonCardHeader, IonImg } from "@ionic/react";
import { colors } from "../../../styles/theme";
import { ColorTheme } from "../../../types/modifier";
import { NEWSPAGE_BASE_URL } from "../../../utils/pages";
import getArticleFormattedDate from "../../../utils/util";
import { ArticleVariant, NewscardProps } from "../ArticleCard";

const BasicArticleCard = (props: NewscardProps) => {
  const {
    theme = ColorTheme.LIGHT,
    variant = ArticleVariant.SMALL,
    styles = {},
    imageSrc,
    label,
    slug,
    badge,
    type,
    date,
    category,
  } = props;

  const articlePublishedDate = getArticleFormattedDate(date);
  const path = `${NEWSPAGE_BASE_URL}/${slug}`;

  return (
    <div sx={{ padding: "10px", height: "100%" }}>
      <IonCard
        routerLink={path}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderBottomColor: "rgba(12, 12, 12, 0.17)",
          backgroundColor:
            theme === ColorTheme.GRAY ? colors.gray300 : colors.white,
          margin: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <IonImg
          src={imageSrc}
          alt={label}
          sx={{
            height: ["140px", "160px", "210px"],
            maxWidth: "100%",
            objectFit: "cover",
          }}
        ></IonImg>

        <IonCardHeader
          style={{
            paddingLeft: 0,
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <div sx={{ display: "flex", flexDirection: "column" }}>
            {category?.data?.attributes.name && (
              <p
                sx={{
                  variant: "text.subheading4",
                  color: colors.black,
                  paddingTop: 1,
                }}
              >
                {category.data.attributes.name}
              </p>
            )}

            <h2
              sx={{
                variant: "text.heading5",
                color: colors.black,
                paddingTop: 2,
              }}
            >
              {label}
            </h2>

            <p
              sx={{
                variant: "text.label2",
                color: colors.black,
                paddingTop: "5px",
              }}
            >
              {articlePublishedDate}
            </p>
          </div>
        </IonCardHeader>
      </IonCard>
    </div>
  );
};

export default BasicArticleCard;
