import PercentInput from './component.vue';

export {
  PercentInput,
};

function install(Vue) {
  Vue.component('percent-input', PercentInput);
}

export default install;

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
