<script setup lang="ts">
import type { QTableProps } from 'quasar'
import { categoriesStore } from '~/stores/kategoriya/kategoriya'
import useNotify from '~/composables/useNotify'
import type CategoryDialog from "~/components/CategoryDialog.vue";
const store = categoriesStore()
import useDialog from "~/composables/useDialog";
const { dialog } = useDialog();
import { useVariablesStore } from '~/stores/variables'
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
    name: 'actions',
    label: 'Амаллар',
    align: 'left',
    field: 'actions',
  },

]
async function onRequest() {
  await store.fetchData()
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
  variablesStore.pageTitle = "Категория";
  init()
})
const reset = ref<InstanceType<typeof CategoryDialog>>();

function handleAdd(){
  store.editing = false;
  store.obj = {
    name:'',
    type: 'Чиким',
    id:0,
    user:0,
  }
  reset.value?.showSidebar();    
}

function deleteCategory(id:any) {
  dialog({
    message: "Шу категорияни учиришни тасдиклайсизми?",
  }).onOk(async () => {
    try {
      useOverlay(true);
      await store.deleteData(id)
      await store.fetchData();
      notify.success(
        "Муваффакиятли учирилди!"
      );
    } catch (error: any) {
      notify.error(
        "Серверда хатолик юз берди"
      );
    } finally {
      useOverlay(false);
    }
  });
}
  
function edit(data: any) {
  store.obj = { ...data };
  store.editing = true;
 
  reset.value?.showSidebar();  
}

</script>

<template>
   <CategoryDialog ref="reset" />
  <q-table
    rows-per-page-label="Sahifadagi qatorlar soni"
    no-data-label="Ma'lumotlar mavjud emas"
    :loading="store.loading"
    :rows="store.categories"
    :columns="headers"
    flat
    hide-pagination
    class="sticky-headered-table"
    virtual-scroll
    table-header-class="bg-gray-200 font-bold"
    :class="store.categories.length > 0 ? 'height_table' : ''"
    :virtual-scroll-sticky-size-start="48"
    :virtual-scroll-item-size="48"
    :rows-per-page-options="[50]"
    @request="onRequest"
  >
  <template #top-right="scope" >
  <div :scope="scope">
      <q-btn
        outline
        color="green"
        label="яратиш"
        @click='handleAdd'
      ></q-btn>
    </div>
  </template>
    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          padding="6px"
          color="orange"
          flat
          rounded
        >
          <span i-carbon-edit text-15px @click="edit(props.row)" />
        </q-btn>
        <q-btn
          padding="6px"
          ml-4
          color="red"
          flat
          rounded
        >
          <span i-carbon:trash-can text-15px @click="deleteCategory(props.row.id)" />
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>


<style scoped lang="scss">
.height_table {
  @apply h-87vh;
}
</style>
