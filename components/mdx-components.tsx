import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

function Figure({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <figure>
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  img: (
    props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  ) => (
    <Figure
      src={typeof props.src === "string" ? props.src : undefined}
      alt={props.alt}
    />
  ),
};
