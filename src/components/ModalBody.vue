<script>
export default {
  data() {
    const options = [];
    const preOptions = this.$store.state.residents.filter(element => element.childOf === null);
    preOptions.forEach(element => {
      options.push({ value: element.id, text: element.name });
    });
    return {
      name: null,
      number: null,
      child: null,
      error: false,
      options,
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.number) {
        let payload = {name: this.name, number: this.number, childOf: this.child};
        this.$store.commit('addNewResident', payload);
        this.$store.commit('modalVisible');
      } else {
        this.error = !this.error;
        setTimeout(() => this.error = !this.error, 5000);
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="modal-body">
      <div>
        <b-form>
          <label for="form-input-name">Name</label>
          <b-input
            id="form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="name"
          ></b-input>
          <br>
          <label for="form-input-username" >Number in 1234567890 format</label>
          <b-input id="form-input-number" v-model="number" type="number"></b-input>
          <br>
          <label for="form-select">Select parent if needed</label>
          <b-form-select
            id="form-select"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="child"
            :options="options"            
            :value="null"
          ></b-form-select>
        </b-form>
      </div>
    </div>
    <div class="modal-footer">
      <div v-if="this.error" id="error-text">Please fill out form!</div>
      <button type="button" class="btn btn-primary" @click="onSubmit()">Save changes</button>
    </div>
  </div>
</template>

<style>
#error-text {
  color: red;
}
</style>
