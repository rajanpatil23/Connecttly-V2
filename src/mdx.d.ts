declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;

  export const title: string;
  export const slug: string;
  export const date: string;
  export const excerpt: string;
  export const cover: string | undefined;
  export const tags: string[] | undefined;
  export const category: string;
  export const layout: string | undefined;
  export const draft: boolean | undefined;
}
