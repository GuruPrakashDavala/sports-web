/** @jsxImportSource theme-ui */

import { ColorTheme, ComponentVariant } from "../../../types/modifier";
import { Blocks, BlockType } from "../../../utils/blocks";
import ArticleCard, { ArticleVariant } from "../../Cards/ArticleCard";
import MultiInfoCard from "../../Cards/MultiInfoCard";
import SectionWrapper from "../../Wrappers/SectionWrapper";

type ContentGridBlocks = {
  blocks: Blocks[];
};

type BlockPickerProps = { block: Blocks; key: string };

const BlockPicker = ({ block }: BlockPickerProps): JSX.Element => {
  switch (block.type) {
    case BlockType.NEWSCARD:
      return (
        <ArticleCard
          imageIndex={block.imageIndex}
          theme={ColorTheme.DARK}
          variant={block.variant}
          styles={{ height: "100%" }}
        />
      );
    case BlockType.MULTIINFOCARD:
      return (
        <MultiInfoCard
          label={block.label}
          variant={block.variant}
          styles={{ height: "100%" }}
        />
      );
    default:
      return <></>;
  }
};

const ContentGrid = ({ blocks }: ContentGridBlocks): JSX.Element => {
  // ContentGrid theme should be always dark
  const theme = ColorTheme.DARK;

  return (
    <SectionWrapper theme={theme}>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {blocks.map((block, index) => (
          <div
            sx={{
              flexBasis: ["100%", null, "calc(100% / 3)"],
              marginBottom: [null, null, 2],
            }}
          >
            <BlockPicker block={block} key={block.id} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ContentGrid;
