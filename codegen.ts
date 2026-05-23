import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        defaultScalarType: "unknown",
        enumsAsTypes: true,
        skipTypename: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
