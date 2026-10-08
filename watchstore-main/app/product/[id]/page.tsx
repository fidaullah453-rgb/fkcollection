import type { Metadata } from "next";
import { products } from "@/app/data/products";
import { SITE } from "@/app/lib/site";
import ProductClient from "./ProductClient";

type Props = { params: Promise<{ id: string }> };
const find = (id: string) => products.find(p => String(p.id) === id);

export function generateStaticParams() {
  return products.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = find(id);
  if (!p) return { title: "Product not found" };
  const desc = `${p.description.slice(0, 140)} Rs. ${p.price}. Cash on delivery in Pakistan.`;
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/product/${p.id}` },
    openGraph: { title: p.name, description: desc, images: [p.image] },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const p = find(id);
  const ld = p && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image.startsWith("/") ? SITE + p.image : p.image,
    brand: { "@type": "Brand", name: "FK Collection" },
    offers: {
      "@type": "Offer",
      url: `${SITE}/product/${p.id}`,
      priceCurrency: "PKR",
      price: p.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <ProductClient />
    </>
  );
}
