<script>
import Modal from './Modal';
import Resident from './Resident';
export default {
  components: {
    Resident,
    Modal,
  },
  data() {
    return {
      fields: ['name', 'number'],
    };
  },
  methods: {
    modalVisible() {
      this.$store.commit('modalVisible');
    },
    sortByName() {
      if (this.$store.state.sorted === 'byName') {
        this.$store.commit('returnSortOrder');
      } else {
        this.$store.commit('sortByName');
      }
    },
    sortByNumber() {
      if (this.$store.state.sorted === 'byNumber') {
        this.$store.commit('returnSortOrder');
      } else {
        this.$store.commit('sortByNumber');
      }
    },
  },
};
</script>

<template>
  <div id='main'>
    <b-table-simple striped hover :fields="fields">
      <b-thead head-variant="dark">
        <b-tr v-if="!this.$store.state.sorted">
          <b-th colspan="2" @click="sortByName()">Name</b-th>
          <b-th @click="sortByNumber()">Number</b-th>
        </b-tr>
        <b-tr v-else-if="this.$store.state.sorted === 'byNumber'">
          <b-th colspan="2" @click="sortByName()">Name</b-th>
          <b-th @click="sortByNumber()"><b-icon icon="sort-numeric-down"></b-icon> Number</b-th>
        </b-tr>
        <b-tr v-else-if="this.$store.state.sorted === 'byName'">
          <b-th colspan="2" @click="sortByName()"><b-icon icon="sort-alpha-down"></b-icon> Name</b-th>
          <b-th @click="sortByNumber()">Number</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <Resident v-for="resident of this.$store.state.residents" :key="resident" :resident="resident"/>
      </b-tbody>
    </b-table-simple>
    <b-button @click="modalVisible()" id="modalOpenButton">+ Add</b-button>
    <div v-if="this.$store.state.modalActive">  
      <Modal />
    </div>
  </div>
</template>

<style>
#main {
  padding: 5em;
  margin: auto;
  width: 50%;
}
#modalOpenButton {
  width: 100%;
}
</style>
