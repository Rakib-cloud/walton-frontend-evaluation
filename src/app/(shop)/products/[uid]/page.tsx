import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { getClient } from "@/graphql/client/apollo-rsc";
import { assertGetProductsSuccess } from "@/graphql/client/api-response";
import { getFragmentData } from "@/graphql/generated";
import {
  GetProductByUidDocument,
  ProductDetailFieldsFragmentDoc,
} from "@/graphql/generated/graphql";

type ProductDetailPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { uid } = await params;

  try {
    const { data } = await getClient().query({
      query: GetProductByUidDocument,
      variables: { uid },
    });

    const productRef = data?.getProducts?.result?.products[0];
    const product = productRef
      ? getFragmentData(ProductDetailFieldsFragmentDoc, productRef)
      : null;

    return {
      title: product?.enName ?? "Product",
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { uid } = await params;

  const { data } = await getClient().query({
    query: GetProductByUidDocument,
    variables: { uid },
  });

  if (!data) {
    throw new Error("No response from API");
  }

  assertGetProductsSuccess(data.getProducts);

  const productRef = data.getProducts.result.products[0];
  if (!productRef) {
    notFound();
  }

  const product = getFragmentData(ProductDetailFieldsFragmentDoc, productRef);

  return <ProductDetailView product={product} />;
}
