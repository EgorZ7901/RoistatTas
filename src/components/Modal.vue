<script>
import ModalBody from './ModalBody';
export default {
  components: {
    ModalBody,
  },
  methods: {
    modalVisible() {
      this.$store.commit('modalVisible');
    },
  },
};
</script>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add resident</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalVisible()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ModalBody />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
