<script setup lang="ts">
import { QForm } from "quasar";
import useNotify from "~/composables/useNotify";
import useFormRules from "~/composables/useFormRules";
import { categoriesStore } from '~/stores/kategoriya/kategoriya'

const store = categoriesStore();
const notify = useNotify();
const { required } = useFormRules();
const show = ref(false);
function showSidebar() {
  show.value = true;
}

const form = ref<QForm | null>(null);

function saveBtn() {
  form.value?.validate().then(async (r) => {
    if (r) {
      try {
        useOverlay(true);
        if (store.editing) store.editSettings();
        else store.createSettings();
        notify.success("Muvaffaqiyatli saqlandi");
       setTimeout(() => {
        store.fetchData();
       }, 1000); 
        show.value = false;
      } catch (e: any) {
        notify.error(
          e.response.data.message || "Ma'lumot saqlashda xatolik"
        );
      } finally {
        useOverlay(false);
      }
    }
  });
}
defineExpose({ showSidebar });
function closeBtn() {
  show.value = false;
}

const options = ['Чиким', 'Кирим' ]
</script>

<template>
  <q-drawer
    v-model="show"
    persistent
    behavior="mobile"
    :width="400"
    px-5
    py-3
    :breakpoint="500"
    side="right"
    overlay
    bordered
  >
    <div flex justify-between>
      <span v-if="!store.editing" class="title">
        Yangi kategoriya qo'shish
      </span>
      <span v-else class="title">Kategoriya ma'lumotlarini o'zgartirish</span>
    </div>
    <QForm ref="form">
      <div mt-4>
        
      </div>
      <q-input
        v-model="store.obj.name"
        type="text"
        :rules="[required()]"
        outlined
        dense
        label="Nomi"
      />
      <q-select
          v-model="store.obj.type"
          clearable
          map-options
          emit-value
          :disable="store.editing"
          option-value="id"
          :options="options"
          label="Turi"
          outlined
          dense
        />
      <div mt-5 flex justify-end>
        <q-btn color="indigo" dense style="width: 120px" @click="saveBtn">
            Saqlash
        </q-btn>
        <q-btn ml-2 color="red" dense style="width: 120px" @click="closeBtn">
            Oynani yopish
        </q-btn>
      </div>
    </QForm>
  </q-drawer>
</template>

<style scoped>
.title {
  @apply text-bold text-18px;
}
</style>
