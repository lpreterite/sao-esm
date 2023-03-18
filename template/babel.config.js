const plugins = []
if (process.env.NODE_ENV === 'test') {
  plugins.push(["istanbul"])
}

module.exports = {
  "exclude": "node_modules/**",
  <% if(moduleBy === 'vue'){ %>
  "presets": [["@vue/app", { "useBuiltIns": "entry" }]],
  <% }else{ %>
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "corejs":2,
        "useBuiltIns": "entry"
      }
    ]
  ],
  <% } %>
  plugins
}
