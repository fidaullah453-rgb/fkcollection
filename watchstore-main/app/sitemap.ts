import type { MetadataRoute } from "next";
import { products } from "./data/products";
import { SITE } from "./lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    ...products.map(p => ({ url: `${SITE}/product/${p.id}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
