# vue-modal
Примитивное модальное окно для vue 3 и bootstrap.
Подойдет для замены стандартных alert-ов браузера, а так же для реализации модальных окон.
Предполагается, что вы используете в своем проекте bootstrap и подключили стили глобально.

# Установка

```shell
git clone git://github.com/artbeard/vue-modal.git
cd vue-modal
npm link
cd path/to/your/project
npm link vue-modal
```
Необходимо отметить, каждый раз при  `npm install` или `npm update` слетают залинкованные библиотеки, и команду `npm link vue-modal` каждый раз прийдется повторять.

# Использование
## Глобальное подключение

В файле main.js нужно импортиовать плагин и установить его при помощи use():

```javascript
import {VueModalPlugin} from 'vue-modal';
const app = createApp(App)
app.use(VueModalPlugin);
...
app.mount('#app');
```

Далее в каком-либо из ваших компонентов:

```html
<template>
   <div class="row">
      <div class="col-12">
         <button class="btn btn-primary" @click="enterName">Prompt</button>
      </div>
      <div class="col-12">
         {{name}}
      </div>
      <div class="col-12">
         <button class="btn btn-secondary" @click="checkName">Alert</button>
      </div>
      <div class="col-12">
         <button class="btn btn-default" @click="checkMultiplicationTable">Confirm</button>
      </div>
      <div class="col-12">
         {{mtCheck}}
      </div>
      <div class="col-12">
         <button class="btn btn-primary" @click="$vueModals['modalWindow'].show()">Show Modal</button>
      </div>
   </div>

   <vue-modal id="modalWindow" title="" size="xl" @modalOk="okBtnPressed">
      ...
      <div>Здесь можно разместить любой текст или html код</div>
      ...
   </vue-modal>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
   data: function() {
      return {
         name: '',
         mtCheck: '',
      }
   },
   methods: {
      enterName() {
         this.$vueModalPrompt('Введите имя')
            .then(enteredName => {
               if (Boolean(enteredName)) {
                  this.name = enteredName;
               }
            });
      },
      checkName() {
         let message = Boolean(this.name) ?
            '<span class="text-success">Имя введено!</span>' :
            '<span class="text-danger">Имя не введено!!!</span>';
         this.$vueModalAlert(message, 'Проверка имени');
      },
      checkMultiplicationTable() {
         this.$vueModalConfirm('2 x 2 = 4?')
            .then(res => {
               if (res)
                  this.mtCheck = 'Поздравлаю, Вы знаете тебалицу умножения!';
               else
                  this.mtCheck = 'Позор, Вы не знаете тебалицу умножения!!!';
            })
      },
      okBtnPressed() {
         alert('Ура, нажали на кнопку OK'!)
      }
   }
})
</script>
```

## Локальное подключение

В одном из ваших компонентов нужно импортировать само модальное окно:

```html
<template>
   ...
</template>

<script>
import { defineComponent } from 'vue';
import {VueModal} from 'vue-modal';
...
export default defineComponent({
   components: {
      VueModal
   },
   ...
})
</script>
```
Далее использовать, как при глобальном подключении.