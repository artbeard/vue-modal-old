import { createApp } from 'vue'
import vueModal from "./VueModal.vue";
export default {
	install: (app, options) => {
		app.component('VueModal', vueModal)

		//TODO реализовать добавление сюда всех экземплаяров VueModal, имеющих id
		app.config.globalProperties.$vueModals = {}; //Хранение обявленных окон

		app.config.globalProperties.$vueModalAlert = (content, title = null) => {
			return new Promise(function(resolve, reject) {
				let div = document.createElement('div');
				document.body.append(div);

				const wrapModal = createApp({
					template: `
						<vue-modal
							ref="vueModalAlert"
							title="${title ?? 'Сообщение'}"
							size="sm"
							:cancelButton="false"
							:closeButton="false"
							@modalOk="onOk"
							>
							${content}
						</vue-modal>`,
					methods: {
						onOk(){
							resolve(true);
							wrapModal.unmount();
							div.remove();
						},
						showAlert(){
							this.$refs['vueModalAlert'].show();
						},
					},
				});
				wrapModal.component('vue-modal', vueModal);
				const wrapModalComponent = wrapModal.mount(div);
				wrapModalComponent.showAlert();
			});
		};

		app.config.globalProperties.$vueModalPrompt = (title = null, _default=null) => {
			return new Promise(function(resolve, reject) {
				let div = document.createElement('div');
				document.body.append(div);

				const wrapModal = createApp({
					template: `
						<vue-modal
							ref="vueModalPrompt"
							title="${title ?? 'Введите данные'}"
							size="sm"
							:closeButton="false"
							@modalOk="onOk"
							@modalCansel="onCanscel"
							>
							<form class="bootbox-form" @submit.prevent="onOk">
								<input
									ref="vueModalPromptInputElement"
									class="bootbox-input bootbox-input-text form-control"
									v-model="result"
									autocomplete="off"
									type="text">
							</form>
						</vue-modal>`,
					data() {
						return {
							result: _default ?? ''
						}
					},
					methods: {
						onOk(){
							resolve(this.result != '' ? this.result : _default);
							this.removeModal();
						},
						onCanscel(){
							resolve(null);
							this.removeModal();	
						},
						showPrompt(){
							this.$refs['vueModalPrompt'].show().then(()=>{
								this.$refs['vueModalPromptInputElement'].focus();
							});
						},
						removeModal(){
							wrapModal.unmount();
							div.remove();
						},
					},
				});
				wrapModal.component('vue-modal', vueModal);
				const wrapModalComponent = wrapModal.mount(div);
				wrapModalComponent.showPrompt();
			});
		};


		app.config.globalProperties.$vueModalConfirm = (content, title = null) => {
			return new Promise(function(resolve, reject) {
				let div = document.createElement('div');
				document.body.append(div);

				const wrapModal = createApp({
					template: `
						<vue-modal
							ref="vueModalConfirm"
							title="${title ?? 'Подтвердите действие'}"
							size="sm"
							:closeButton="false"
							@modalOk="onOk"
							@modalCansel="onCanscel"
							>
							${content}
						</vue-modal>`,
					methods: {
						onOk(){
							resolve(true);
							this.removeModal();
						},
						onCanscel(){
							resolve(false);
							this.removeModal();	
						},
						showPrompt(){
							this.$refs['vueModalConfirm'].show();
						},
						removeModal(){
							wrapModal.unmount();
							div.remove();
						},
					},
				});
				wrapModal.component('vue-modal', vueModal);
				const wrapModalComponent = wrapModal.mount(div);
				wrapModalComponent.showPrompt();
			});
		};


	}
}