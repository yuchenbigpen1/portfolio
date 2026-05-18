/**
 * Minimal inline replacement for `remark-unwrap-images`.
 *
 * MDX/Markdown wraps standalone images in a paragraph node. Rendered as HTML
 * that produces `<p><img></p>`, which can't legally hold a block-level
 * `<figure>` (our custom `img` override). This plugin replaces a paragraph
 * whose only children are images with the images themselves.
 */
export default function remarkUnwrapImages() {
  return (tree) => {
    if (!tree || !Array.isArray(tree.children)) return;
    tree.children = tree.children.flatMap((node) => {
      if (node.type !== "paragraph" || !Array.isArray(node.children)) return [node];
      const onlyImages = node.children.every((c) => c.type === "image");
      return onlyImages ? node.children : [node];
    });
  };
}
