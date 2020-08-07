import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'minireset.css';
import './fonts.css';
import { Plugin } from 'vue-fragment';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Plugin);

const store = new Vuex.Store({
  state: {
    nonSortedResidents: [],
    modalActive: false,
    residents: [],
    sorted: false,
  },
  mutations: {
    modalVisible: state => state.modalActive = !state.modalActive,
    addNewResident: (state, payload) => { 
      if (payload.childOf !== null) { 
        const newChild = {name: payload.name, number: payload.number, id: state.residents.length, childOf: payload.childOf};
        const position = state.residents.map((element) => element.id).indexOf(payload.childOf);
        state.residents.splice(position + 1, 0, newChild);
        state.residents[position].childs.push(newChild);
      } else {
        state.residents.push({ name: payload.name, number: payload.number, id: state.residents.length, childOf: payload.childOf, childs: []});
      }
      const newLocalStorage = JSON.stringify(state.residents);
      localStorage.residents = newLocalStorage;
    },
    sortByName: (state) => {
      if (!state.sorted) {
        state.sorted = 'byName';
        state.nonSortedResidents = [...state.residents];
        state.residents.sort((a, b) => ('' + a.name.toLowerCase).localeCompare(b.name.toLowerCase));
      } else {
        state.sorted = 'byName';
        state.residents = [...state.nonSortedResidents];
        state.residents.sort((a, b) => ('' + a.name).localeCompare(b.name));
      }
    },
    sortByNumber: (state) => {
      if (state.sorted === false) {
        state.sorted = 'byNumber';
        state.nonSortedResidents = [...state.residents];
        state.residents.sort((a, b) => a.number - b.number);
      } else {
        state.sorted = 'byNumber';
        state.residents = [...state.nonSortedResidents];
        state.residents.sort((a, b) => a.number - b.number);
      }
    },
    returnSortOrder: (state) => {
      state.sorted = false;
      state.residents = [...state.nonSortedResidents];
    },
  },
});

const emit = Vue.prototype.$emit;
Vue.prototype.$emit = function() {
  // const componentTag = this.$vnode.componentOptions.tag;
  // // eslint-disable-next-line no-console
  // console.log('@event ' + componentTag + ' -> ' + arguments[0], Array.from(arguments).slice(1));
  emit.apply(this, arguments);
};

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  mounted() {
    if (localStorage.residents) {
      const loadedData = JSON.parse(localStorage.residents);
      this.$store.state.residents = loadedData;
    }
  },
});
