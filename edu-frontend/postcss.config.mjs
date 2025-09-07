const config = {
    plugins: {
        autoprefixer: {},
        "postcss-pxtorem": {
            propList: ["*"],
            rootValue: 16,
            selectorBlackList: ["html"],
        },
    },
};

export default config;
