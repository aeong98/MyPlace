module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    'storybook-css-modules-preset',
    {
      // nomodule

      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        }
        ,
      },
    },
    {
      name: `@storybook/preset-scss`,
      options: {
          rule: {
              test: /\.module\.s[ca]ss$/,
          },
          cssLoaderOptions: {
              modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
              },
          }
      }
    }
  ],
  "framework": "@storybook/react",
  
}