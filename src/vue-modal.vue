<template>
   <teleport to="body">
      <div class="modal fade show d-block vue-modal" 
            :class="{'vue-modal-overlay': overlay}"
            style="padding-right: 17px;"
            v-if="showModal">
         <div class="modal-dialog modal-dialog-scrollable" :class="['modal-' + size]">
            <div class="modal-content">
               <div class="modal-header">
                  <div v-html="title"></div>
                  <button type="button" v-if="closeButton" class="close" @click="onClose($event)">✕</button>
               </div>
               <div class="modal-body">
                  <slot></slot>
               </div>
               <div class="modal-footer" v-show="cancelButton || okButton">
                  <button type="button" 
                     class="btn btn-default"
                     v-if="cancelButton != false"
                     @click="onCanscel($event)">{{cancelButton}}</button>
                  <button type="button"
                     class="btn btn-primary"
                     v-if="okButton != false"
                     @click="onOk($event)">{{okButton}}</button>
               </div>
            </div>
         </div>

      </div>
   </teleport>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
   name: 'VueModal',
   data() {
      return {
         showModal: false,
      }
   },
   props: {
      id: {
         type: String,
         default: null
      },
      /**
       * Заголовок окна
       */
      title: {
         type: String,
         default: 'Заголовок окна'
      },
      /**
       * Кнока закрытия
       */
      closeButton: {
         type: Boolean,
         default: true
      },
      /**
       * Кнопка отмены
       */
      cancelButton: {
         type: [String, Boolean],
         default: 'Отмена'
      },
      /**
       * Кнопка Ok
       */
      okButton: {
         type: [String, Boolean],
         default: 'Ok'
      },
      /**
       * Размер
       */
      size: {
         type: String,
         default: 'sm'
      },
      /**
       * Оверлей
       */
      overlay: {
         type: Boolean,
         default: true
      },
   },
   emits: [
      'modalOk',
      'modalCansel',
      'modalClose',
      'modalShow',
      'modalHide',
   ],
   methods: {
      //События кнопок
      onOk(e) {
         this.hide();
         this.$emit('modalOk', e);
      },
      onCanscel(e) {
         this.hide();
         this.$emit('modalCansel', e);
      },
      onClose(e) {
         this.hide();
         this.$emit('modalClose', e);
      },
      //Методы
      show(e) {
         this.showModal = true;
         return new Promise((resolve) => {
            this.$emit('modalShow', e);
            resolve(true)
         });
      },
      hide(e) {
         this.showModal = false;
         return new Promise((resolve) => {
            this.$emit('modalHide', e);
            resolve(true)
         });
      },
      toggle() {
         if (this.showModal)
            this.hide()
         else
            this.show();
      },
   },
   created() {
      if (
         typeof this.$vueModals != 'undefined' &&
         this.id != null &&
         !(this.id in this.$vueModals)
      ) {
         this.$vueModals[this.id] = this;
      }
   },
   unmounted() {
      if (
         typeof this.$vueModals != 'undefined' &&
         this.id != null &&
         !(this.id in this.$vueModals)
      ) {
         delete this.$vueModals[this.id];
      }
   },
})
</script>

<style scoped>
.vue-modal-overlay {
   background: rgba(0, 0, 0, 0.5);
}
/*.vue-modal {}*/
</style>