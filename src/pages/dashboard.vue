<script setup lang="ts">
import type { QTableProps } from 'quasar'
import { dashboardStore } from '~/stores/dashboard/dashboard'
import useNotify from '~/composables/useNotify'
import type CategoryDialog from "~/components/CategoryDialog.vue";
import { useVariablesStore } from '~/stores/variables'

const store = dashboardStore()
const variablesStore = useVariablesStore();
const notify = useNotify()
const headers: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ИД',
    align: 'left',
    field: 'id',
  },

  {
    name: 'name',
    label: 'Номи',
    align: 'left',
    field: 'name',
  },
  {
    name: 'type',
    label: 'Тури',
    align: 'left',
    field: 'type',
  },
  {
    name: 'issuer',
    label: 'Кимга',
    align: 'left',
    field: 'issuer',
  },
  {
    name: 'amount_sum',
    label: 'УЗС Сум',
    align: 'left',
    field: 'amount_sum',
  },
  {
    name: 'amount_dollar',
    label: 'USD доллар',
    align: 'left',
    field: 'amount_dollar',
  },
  {
    name: 'dolar_price',
    label: 'Курс',
    align: 'left',
    field: 'dolar_price',
  },
  {
    name: 'issued',
    label: 'Сана ва вакт',
    align: 'left',
    field: 'issued',
  },
  {
    name: 'actions',
    label: 'Амаллар',
    align: 'left',
    field: 'actions',
  },

]
async function onRequest() {
  await store.fetchData()
}
async function excel() {
      try {
        await store.excel()
         notify.success("Muvaffaqiyatli saqlandi");
        return Promise.resolve();
      } catch (e) {
        notify.error(
          "Excel файлни юклаб олишда хатолик юз берди!"
        );
        return Promise.reject(e);
      }
    }
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
  variablesStore.pageTitle = "Dashboard";
  init()
})
const reset = ref<InstanceType<typeof CategoryDialog>>();
const options = [{eng: 'IN', uz:'Кирим'}, {eng: 'OUT', uz:'Чиким'}]
function updateInput() {
  const {from, to} = store.date
      if (from && to) {
        store.updatedDate = `${from}/${to}`;
      } else {
        store.updatedDate = '';
      }
     store.fetchData()
    }

function ordering(){
  if(store.ordering === '-issued'){
    store.ordering = 'issued'
  } else {
    store.ordering = '-issued'
  }
  store.fetchData()
}


</script>

<template>
   <CategoryDialog ref="reset" />
   <div class="menubar row">
   <div my-4 flex >
    <div ml-4 relative>
      <input
          v-model="store.search"
          type="text"
          placeholder="Кидирув"
          class="py-2.4"
          rounded-md
          pr-4
          pl-4
          max-w-100
          border
          outline-none
          border-gray-400
          focus:border-green
          @keyup.enter="store.fetchData"
       
        />

        <svg
          absolute
          right-3
          top-3
          width="18"
          
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          @click="store.fetchData"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0257 12.8475L17.5948 16.4158L16.4157 17.595L12.8473 14.0258C11.5196 15.0901 9.86817 15.669 8.1665 15.6666C4.0265 15.6666 0.666504 12.3066 0.666504 8.16663C0.666504 4.02663 4.0265 0.666626 8.1665 0.666626C12.3065 0.666626 15.6665 4.02663 15.6665 8.16663C15.6689 9.86829 15.09 11.5197 14.0257 12.8475ZM12.354 12.2291C13.4116 11.1415 14.0022 9.68365 13.9998 8.16663C13.9998 4.94329 11.389 2.33329 8.1665 2.33329C4.94317 2.33329 2.33317 4.94329 2.33317 8.16663C2.33317 11.3891 4.94317 14 8.1665 14C9.68353 14.0023 11.1414 13.4117 12.229 12.3541L12.354 12.2291Z"
            fill="#8896A1"
          />
        </svg>
      </div>
      <div ml-4>
        <q-select
          v-model="store.category__type"
          clearable
          option-label="uz"
          map-options
          use-input
          emit-value
          option-value="eng"
          :options="options"
          label="Тури"
          outlined
          dense
          @update:model-value="store.fetchData"
        />
      </div>
      <div ml-4>
        <q-input label="Сана" outlined dense v-model="store.updatedDate" py-0>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="store.date" range mask="YYYY-MM-DD" @click="updateInput">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      
      </div>
      <div mr-4 my-4>
        <div class="col-2">
          <q-btn color="positive" label="excelga юклаш" @click="excel"></q-btn>
        </div>
        </div>
      </div>
      <div class="sortbar row my-4">
        <div class="col-2">
          <q-btn color="primary" :icon-right="store.ordering === 'issued' ? 'arrow_downward' : 'arrow_upward'" label="Саралаш" @click="ordering"></q-btn>
        </div>
      </div>
      <q-table
        rows-per-page-label="Sahifadagi qatorlar soni"
        no-data-label="Ma'lumotlar mavjud emas"
        :loading="store.loading"
        :rows="store.categories"
        :columns="headers"
        flat
        hide-pagination
        virtual-scroll
        class="sticky-headered-table"
        :rows-per-page-options="[50]"
        table-header-class="bg-gray-200 font-bold"
        :class="store.categories.length > 0 ? 'height_table' : ''"
        :virtual-scroll-sticky-size-start="48"
        :virtual-scroll-item-size="48"
        @request="onRequest"
      >
  
  <template #body-cell-issued="props">
      <q-td :props="props">
      {{ props.row.issued.slice(0,16).replace('T', ' ') }}
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          padding="6px"
          color="orange"
          flat
          rounded
        >
          <span i-carbon-edit text-15px />
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>


<style scoped lang="scss">
.height_table {
  @apply h-87vh;
}
.menubar{
  justify-content: space-between;
}
.sortbar{
  justify-content: flex-end;
}
</style>
