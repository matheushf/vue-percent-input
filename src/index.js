import VuePercent from './component.vue';

const { VERSION } = proccess.env;

export {
  VuePercent,
  VERSION,
};

function install(Vue) {
  Vue.component('vue-percent', VuePercent);
}

export default install;

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
