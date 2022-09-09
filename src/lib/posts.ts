import { readFile } from "fs/promises";
import { marked } from "marked";

export const getPost = async (slug: string) => {
  const source = await readFile(`src/mocks/markdowns/first-post.md`, "utf8");
  const html = marked(source);
  return {
    body: { html },
  };
};
