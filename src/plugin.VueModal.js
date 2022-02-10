import { createApp } from 'vue'
import vueModal from "./VueModal.vue";
export default {
	install: (app, options) => {
		//TODO реализовать добавление сюда всех экземплаяров VueModal, имеющих id
		app.config.globalProperties.$vueModals = {}; //Хранение обявленных окон

		app.config.globalProperties.$vueModalAlert = (content, title = '') => {
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
				//console.log(wrapModal);
				const wrapModalComponent = wrapModal.mount(div);
				wrapModalComponent.showAlert();
			});
		}
	}
}