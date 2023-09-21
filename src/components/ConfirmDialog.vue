<script lang="ts" setup>
import { useDialogPluginComponent } from "quasar";

interface Props {
  message: string;
  persistent?: boolean;
  title?: string;
  ok: string;
  cancel: string;
  type?: "info" | "warning" | "error";
  showAgreement?: boolean;
}
withDefaults(defineProps<Props>(), {
  type: "error",
  showAgreement: false,
});
defineEmits([...useDialogPluginComponent.emits]);
const agreement = ref<boolean>(false);
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } =
  useDialogPluginComponent();

function handleOkClick() {
  onDialogOK();
}

function handleCancelClick() {
  onDialogCancel();
}
</script>

<template>
  <q-dialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <div class="dialog" :class="`dialog--${type}`">
      <div class="dialog__header">
        <span
          v-if="type === 'info'"
          i-carbon-information
          class="dialog__icon"
        />
        <span
          v-else-if="type === 'error'"
          i-carbon-trash-can
          class="dialog__icon"
        />
        <span
          v-else-if="type === 'warning'"
          class="dialog__icon"
          i-carbon-warning-alt
        />
        <p v-if="title" class="dialog__title">
          {{ title }}
        </p>
      </div>
      <div class="dialog__body">
        <p class="dialog__message">
          {{ message }}
        </p>
        <div v-if="showAgreement" mb-1>
          <q-checkbox
            v-model="agreement"
            label="'dialog_label.have_read_the_above'"
          />
        </div>
        <div class="dialog__actions">
          <button class="dialog__button--cancel" @click="handleCancelClick">
            {{ cancel }}
          </button>
          <button
            :disabled="showAgreement && !agreement"
            class="dialog__button--ok"
            @click="handleOkClick"
          >
            {{ ok }}
          </button>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  @apply bg-white w-500px min-h-200px rounded-lg;

  &__header {
    @apply flex flex-col justify-center items-center py-32px;
  }

  &__icon {
    @apply inline-block text-28px;
  }

  &__title {
    @apply text-24px mt-16px mb-0;
  }

  &__body {
    @apply flex flex-col px-48px py-32px;
  }

  &__message {
    @apply font-500 color-gray-700 text-16px mb-24px text-center;
  }

  &__actions {
    @apply flex justify-between gap-x-16px;
  }

  &__button {
    &--cancel {
      @apply border border-gray-300 rounded transition hover: bg-gray-100 flex-1 font-500;
    }

    &--ok {
      @apply transition flex-1 border text-white rounded py-10px font-500;
    }
  }

  &--error &__icon {
    @apply color-red-500;
  }

  &--error &__title {
    @apply color-red;
  }

  &--error &__body {
    @apply bg-red-50;
  }

  &--error &__button--ok {
    @apply bg-red-500 hover: bg-red-400 transition;
  }

  &--warning &__icon {
    @apply color-orange-500;
  }

  &--warning &__title {
    @apply color-orange;
  }

  &--warning &__body {
    @apply bg-orange-50;
  }

  &--warning &__button--ok {
    @apply bg-orange-500 hover: bg-orange-400 transition;
  }

  &--info &__icon {
    @apply color-sky-500;
  }

  &--info &__title {
    @apply color-sky;
  }

  &--info &__body {
    @apply bg-sky-50;
  }

  &--info &__button--ok {
    @apply bg-sky-500 hover: bg-sky-400 transition;
  }
}
</style>
