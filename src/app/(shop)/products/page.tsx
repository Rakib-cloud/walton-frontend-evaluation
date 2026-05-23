import { Suspense } from "react";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import ProductsLoading from "./loading";
import { getClient } from "@/graphql/client/apollo-rsc";
import { assertGetProductsSuccess } from "@/graphql/client/api-response";
import { getFragmentData } from "@/graphql/generated";
import {
  GetProductsDocument,
  ProductCardFieldsFragmentDoc,
} from "@/graphql/generated/graphql";
import {
  toCatalogProduct,
  type CatalogProduct,
} from "@/features/products/utils/product-helpers";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export default async function ProductsPage() {
  const { data } = await getClient().query({
    query: GetProductsDocument,
    variables: {
      pagination: { skip: 0, limit: DEFAULT_PAGE_SIZE },
      filter: { isActive: true },
    },
  });

  if (!data) {
    throw new Error("No response from API");
  }

  assertGetProductsSuccess(data.getProducts);

  const { count, products } = data.getProducts.result;

  const initialProducts = products
    .map((productRef) => getFragmentData(ProductCardFieldsFragmentDoc, productRef))
    .map(toCatalogProduct)
    .filter((product): product is CatalogProduct => product != null);

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsCatalog
        initialProducts={initialProducts}
        totalCount={count ?? initialProducts.length}
      />
    </Suspense>
  );
}
