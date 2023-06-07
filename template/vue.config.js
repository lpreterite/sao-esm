module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "test") {
      config.merge({
        target: "node",
        devtool: "eval"
      });
    }
    if (process.env.NODE_ENV === "production") {
      config.externals({
        ...config.get("externals"),
        // 移除非必要依赖
        // crypto: "crypto"
      });
      <% if(e2eTest){ %>
      config.module.rule('js')
        .use('istanbul')
        .loader('istanbul-instrumenter-loader')
        .options({ esModules: true })
        .before('babel-loader')<% } %>
    }

    config.merge({
      entry: {
        app: "./example/main.js"
      }
    });
    config.plugin("html").tap(args => {
      args[0].template = "./example/index.html";
      return args;
    });

  }
};
