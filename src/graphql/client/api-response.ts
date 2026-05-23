type GetProductsPayload = {
  message: string | null;
  statusCode: number | null;
  result: {
    count?: number | null;
    products: unknown[];
  } | null;
};

export class GraphQLApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "GraphQLApiError";
  }
}

export function assertGetProductsSuccess(
  payload: GetProductsPayload | null | undefined,
): asserts payload is GetProductsPayload & {
  statusCode: 200;
  result: NonNullable<GetProductsPayload["result"]>;
} {
  if (!payload) {
    throw new GraphQLApiError("No response from API", 500);
  }

  if (payload.statusCode !== 200) {
    throw new GraphQLApiError(
      payload.message ?? "Failed to fetch products",
      payload.statusCode ?? 500,
    );
  }

  if (!payload.result) {
    throw new GraphQLApiError("Empty result from API", payload.statusCode);
  }
}
