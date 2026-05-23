/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment ProductCardFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}": typeof types.ProductCardFieldsFragmentDoc,
    "fragment ProductDetailFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  detailedDescriptions {\n    enLabel\n    values {\n      enName\n    }\n  }\n  deliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  serviceAndDeliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  priceAndStocks {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    ebsItemCode\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}": typeof types.ProductDetailFieldsFragmentDoc,
    "query GetProductByUid($uid: String!) {\n  getProducts(pagination: {skip: 0, limit: 1}, filter: {uid: $uid}) {\n    message\n    statusCode\n    result {\n      products {\n        ...ProductDetailFields\n      }\n    }\n  }\n}": typeof types.GetProductByUidDocument,
    "query GetProducts($pagination: PaginationInput, $filter: ProductFilterInput) {\n  getProducts(pagination: $pagination, filter: $filter) {\n    message\n    statusCode\n    result {\n      count\n      products {\n        ...ProductCardFields\n      }\n    }\n  }\n}": typeof types.GetProductsDocument,
};
const documents: Documents = {
    "fragment ProductCardFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}": types.ProductCardFieldsFragmentDoc,
    "fragment ProductDetailFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  detailedDescriptions {\n    enLabel\n    values {\n      enName\n    }\n  }\n  deliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  serviceAndDeliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  priceAndStocks {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    ebsItemCode\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}": types.ProductDetailFieldsFragmentDoc,
    "query GetProductByUid($uid: String!) {\n  getProducts(pagination: {skip: 0, limit: 1}, filter: {uid: $uid}) {\n    message\n    statusCode\n    result {\n      products {\n        ...ProductDetailFields\n      }\n    }\n  }\n}": types.GetProductByUidDocument,
    "query GetProducts($pagination: PaginationInput, $filter: ProductFilterInput) {\n  getProducts(pagination: $pagination, filter: $filter) {\n    message\n    statusCode\n    result {\n      count\n      products {\n        ...ProductCardFields\n      }\n    }\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCardFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}"): (typeof documents)["fragment ProductCardFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductDetailFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  detailedDescriptions {\n    enLabel\n    values {\n      enName\n    }\n  }\n  deliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  serviceAndDeliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  priceAndStocks {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    ebsItemCode\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}"): (typeof documents)["fragment ProductDetailFields on Product {\n  uid\n  enName\n  images {\n    url\n  }\n  productAttributes {\n    enLabel\n    values {\n      enName\n    }\n  }\n  detailedDescriptions {\n    enLabel\n    values {\n      enName\n    }\n  }\n  deliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  serviceAndDeliveries {\n    enLabel\n    values {\n      enName\n    }\n  }\n  priceAndStocks {\n    enLabel\n    values {\n      enName\n    }\n  }\n  variants {\n    mrpPrice\n    ebsItemCode\n    posItemCode\n    quantity\n    discount {\n      amount\n      value\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductByUid($uid: String!) {\n  getProducts(pagination: {skip: 0, limit: 1}, filter: {uid: $uid}) {\n    message\n    statusCode\n    result {\n      products {\n        ...ProductDetailFields\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductByUid($uid: String!) {\n  getProducts(pagination: {skip: 0, limit: 1}, filter: {uid: $uid}) {\n    message\n    statusCode\n    result {\n      products {\n        ...ProductDetailFields\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts($pagination: PaginationInput, $filter: ProductFilterInput) {\n  getProducts(pagination: $pagination, filter: $filter) {\n    message\n    statusCode\n    result {\n      count\n      products {\n        ...ProductCardFields\n      }\n    }\n  }\n}"): (typeof documents)["query GetProducts($pagination: PaginationInput, $filter: ProductFilterInput) {\n  getProducts(pagination: $pagination, filter: $filter) {\n    message\n    statusCode\n    result {\n      count\n      products {\n        ...ProductCardFields\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;