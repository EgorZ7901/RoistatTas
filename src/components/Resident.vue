<script>
export default {
  props: ['resident'],
};
</script>

<template>
  <b-tr v-if="resident.childOf === null">
    <b-td colspan="2"> {{ resident.name }} </b-td>
    <b-td> {{ resident.number }}</b-td>
  </b-tr>
  <b-tr v-else>
    <b-td v-if="!this.$store.state.sorted"> + </b-td>
    <b-td v-if="!this.$store.state.sorted"> {{ resident.name }} </b-td>
    <b-td colspan="2" v-else>{{ resident.name }} </b-td> 
    <b-td> {{ resident.number }}</b-td>
  </b-tr>
</template>

