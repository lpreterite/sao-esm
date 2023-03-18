import { yeah } from "./utils"
<% if(moduleBy !== 'vue'){ %>
export { yeah }
export default {}
<% }else{ %>import HelloWorld from "./components/HelloWorld.vue";
export { HelloWorld, yeah }

export default function () {
  return {
    install(Vue) {
      Vue.component("HelloWorld", HelloWorld);
    },
  };
}
<% } %>
