/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { ImageType } from "../../../types/article";
import { renderImage } from "../../../utils/util";

const ArticleImage = (props: {
  image: ImageType;
  index: number;
  source?: string;
}) => {
  const { image, source, index } = props;
  return (
    <div
      sx={{
        py: [2, null, 4, 5],
      }}
      key={index}
    >
      <img
        src={renderImage(image)}
        sx={{ objectFit: "cover" }}
        alt="image"
        height={"100%"}
        width={"100%"}
      />
      {source && (
        <p
          sx={{
            paddingTop: [1],
            variant: "text.label2",
            color: colors.gray100,
          }}
        >
          Source: {source}
        </p>
      )}
    </div>
  );
};

export default ArticleImage;
