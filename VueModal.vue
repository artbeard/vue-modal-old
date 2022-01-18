<template>
	<div
		class="modal fade show d-block"
		:class="{'vue-modal-overlay': overlay}"
		style="padding-right: 17px;"
		v-if="showModal">
		<div class="modal-dialog"
			:class="['modal-' + size]">
			<div class="modal-content">
				<div class="modal-header">
					<h3 v-html="title"></h3>
					<button type="button" v-if="closeButton" class="close" @click="onClose($event)">×</button>
				</div>
				<div class="modal-body">
					<slot></slot>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-default"
						v-if="cancelButton != false"
						@click="onCanscel($event)">{{cancelButton}}</button>
					<button
						type="button"
						class="btn btn-primary"
						v-if="okButton != false"
						@click="onOk($event)">{{okButton}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'VueModal',
	data() {
		return {
			showModal: false,
		}
	},
	props:{
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
		okButton:{
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
	emits:[
		'modalOk',
		'modalCansel',
		'modalClose',
	],
	
	computed:{
	},
	
	methods:{
		onOk(e){
			this.hide();
			this.$emit('modalOk', e);
		},

		onCanscel(e){
			this.hide();
			this.$emit('modalCansel', e);
		},

		onClose(e){
			this.hide();
			this.$emit('modalClose', e);
		},

		show(){
			this.showModal = true;
		},
		hide(){
			this.showModal = false;
		},
		toggle(){
			this.showModal = !this.showModal;
		},
	},
	setup() {
		
	},
	mounted() {
		console.log(this.okButton);
	},
}
</script>

<style scoped>
.vue-modal-overlay{
	background: rgba(0,0,0, 0.5);
}
</style>