import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            perfectionist,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["off"],
            "perfectionist/sort-imports": [
                "warn",
                {
                    type: "line-length",
                    order: "desc"
                }
            ],
            "perfectionist/sort-objects": [
                "warn",
                {
                    type: "natural",
                    order: "asc"
                }
            ],
            "perfectionist/sort-object-types": [
                "warn",
                {
                    type: "natural",
                    order: "asc"
                }
            ],
            "perfectionist/sort-union-types": [
                "warn",
                {
                    type: "natural",
                    order: "asc"
                }
            ],
            "perfectionist/sort-named-imports": [
                "warn",
                {
                    type: "natural",
                    order: "asc",
                    ignoreAlias: false,
                    groupKind: "types-first"
                }
            ],
            "perfectionist/sort-named-exports": [
                "warn",
                {
                    type: "natural",
                    order: "asc",
                    groupKind: "types-first"
                }
            ],
            "perfectionist/sort-intersection-types": [
                "warn",
                {
                    type: "natural",
                    order: "asc"
                }
            ],
            "perfectionist/sort-jsx-props": [
                "warn",
                {
                    type: "line-length",
                    order: "asc"
                }
            ],
            "perfectionist/sort-switch-case": [
                "warn",
                {
                    type: "natural",
                    order: "asc"
                }
            ],
            "perfectionist/sort-variable-declarations": [
                "warn",
                {
                    type: "line-length",
                    order: "asc"
                }
            ],
            "perfectionist/sort-maps": [
                "warn",
                {
                    type: "line-length",
                    order: "asc"
                }
            ]
        }
    },
];

export default eslintConfig;
