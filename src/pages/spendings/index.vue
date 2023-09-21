<script setup lang="ts">

import { spendingsStore } from '~/stores/spendings/spendings'
const store = spendingsStore()
import useNotify from '~/composables/useNotify'
const notify = useNotify()
import { useVariablesStore } from '~/stores/variables'
const variablesStore = useVariablesStore();

async function init() {
  try {
    useOverlay(true)
    await store.fetchData()
    useOverlay(false)
  }
  catch (err: any) {
    useOverlay(false)
    notify.error(err.response.data.message || 'Xatolik yuz berdi')
  }
}
onMounted(() => {
  variablesStore.pageTitle = "Харажатлар";
  init()
})

function handleAdd(){

  try {
        useOverlay(true);
        store.createSpendings();
        notify.success("Muvaffaqiyatli saqlandi");
       setTimeout(() => {
        store.fetchData();
       }, 1000); 
      } catch (e: any) {
        notify.error(
          e.response.data.message || "Ma'lumot saqlashda xatolik"
        );
      } finally {
        useOverlay(false);
        store.obj.type = '',
        store.obj.category = '',
        store.obj.issuer = "",
        store.obj.amount_dollar = 0,
        store.obj.amount_sum = 0,
        store.obj.description =  "",
        store.obj.dolar_price = 0,
        store.obj.issued = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString().slice(0,16).replace('T', ' ')
      }
}


const options = ['Чиким', 'Кирим' ]

function chooseSpendingTime(){
  if(store.obj.type === 'Кирим'){
        store.chosenCategories = store.categories.filter((e) => e.type === 'Кирим').map(e=>({
      name:e.name,
      id:e.id
    })
    );
  } else if(store.obj.type === 'Чиким'){
    store.chosenCategories = store.categories.filter((e) => e.type === 'Чиким').map(e=>({
      name:e.name,
      id:e.id
    })
    );
  }
  store.obj.category = ''
}

</script>

<template>
    <div class='row' px-4 pt-4>
        <div class='col-6' pr-4 mb-4>
          <q-select
            v-model="store.obj.type"
            clearable
            @update:model-value="chooseSpendingTime"
            map-options
            emit-value
            :options="options"
            label="Харажат тури"
            outlined
            dense
          />
        </div>
        <div class='col-6' pl-4>
          <q-input dense :disable="!store.obj.type"  outlined v-model="store.obj.issued">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="store.obj.issued"  mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="store.obj.issued"  mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class='col-6' pr-4 mb-4>
            <q-input
            v-model="store.obj.issuer"
            :disable="!store.obj.type"
            type="text"
            outlined
            dense
            label='Кимга'
        />
        </div>
        <div class='col-6' pl-4>
          <q-select
            v-model="store.obj.category"
            clearable
            :disable="!store.obj.type"
            map-options
            emit-value
            option-value="id"
            option-label="name"
            :options="store.chosenCategories"
            label="Категория"
            outlined
            dense
          />
        </div>
        <div class='col-6' pr-4 mb-4>
            <q-input
            v-model="store.obj.amount_sum"
            :disable="!store.obj.type"
            type="number"
            outlined
            dense
            label='Сумма'
        />
        </div>
        <div class='col-6' pl-4>
            <q-input
            v-model="store.obj.amount_dollar"
            :disable="!store.obj.type"
            type="number"
            outlined
            dense
            label='Доллар сум'
        />
        </div>
        <div class='col-6' pr-4 mb-4>
            <q-input
            v-model="store.obj.dolar_price"
            :disable="!store.obj.type"
            type="number"
            outlined
            dense
            label='Валюта курси суммаси'
        />
        </div>
        <div class='col-6' pl-4>
            <q-input
            v-model="store.obj.description"
            :disable="!store.obj.type"
            type="textarea"
            outlined
            dense
            label='Изох'
        />
        </div>
        <div class="col-12 flex mt-4 create__spendings">
          <q-btn
            outline
            color="green"
            label="яратиш"
            @click='handleAdd'
          ></q-btn>
         </div>
    </div>
    
</template>


<style scoped lang="scss">
.height_table {
  @apply h-87vh;
}
.create__spendings{
  justify-content: end;
}
</style>
