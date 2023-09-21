<script setup lang="ts">
import useTheme from "~/config/theme";

interface Props {
  onlyPagination?: boolean;
  filterable?: boolean;
  creatable?: boolean;
  simpleSearch?: boolean;
  search?: string;
  title?: string;
  is_title?: boolean;
  scope?: Record<string, any>;
  isDownload?: boolean;
  height?: string;
  justify?: string;
}

interface Emit {
  (e: "add"): void;
  (e: "download"): void;
  (e: "reload"): void;
  (e: "filter"): void;
  (e: "update:search", val: string): void;
}

const {
  creatable = true,
  filterable = false,
  simpleSearch = true,
  isDownload = false,
  search = "",
  scope,
  title = "",
  is_title = false,
} = defineProps<Props>();

const emit = defineEmits<Emit>();
const { dense } = useTheme;

function handleSearchChange(e: Event) {
  emit("update:search", (e.target as HTMLInputElement).value);
}

function clearSearch() {
  emit("update:search", "");
}

// const pageStart = computed(() => {
//   return (scope?.pagination.page - 1) * scope?.pagination.rowsPerPage + 1
// })

// const pageEnd = computed(() => {
//   if (scope?.isLastPage)
//     return scope?.pagination.rowsNumber

//   return scope?.pagination.page * scope?.pagination.rowsPerPage
// })
</script>

<template>
  <div
    flex
    flex-1
    items-center
    :class="`h-${height ? height : 16} justify-${
      justify ? justify : 'between'
    }`"
    border-b
    border-b-gray-300
  >
    <div
      v-if="!onlyPagination"
      flex
      items-center
      :class="dense ? 'gap-x-2' : 'gap-x-4'"
    >
      <button
        v-if="creatable"
        rounded-md
        w-9
        h-9
        flex
        items-center
        justify-center
        @click="emit('add')"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="17.5" stroke-gray-400 />
          <path d="M17 17V11H19V17H25V19H19V25H17V19H11V17H17Z" fill-gray-400 />
        </svg>
      </button>
      <button
        rounded-md
        w-9
        h-9
        flex
        items-center
        justify-center
        @click="emit('reload')"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.463 2.43301C5.27756 0.86067 7.59899 -0.00333987 10 9.70266e-06C15.523 9.70266e-06 20 4.47701 20 10C20 12.136 19.33 14.116 18.19 15.74L15 10H18C18.0001 8.43163 17.5392 6.89781 16.6747 5.58927C15.8101 4.28072 14.5799 3.25517 13.1372 2.64013C11.6944 2.0251 10.1027 1.84771 8.55996 2.13003C7.0172 2.41234 5.59145 3.14191 4.46 4.22801L3.463 2.43301ZM16.537 17.567C14.7224 19.1394 12.401 20.0034 10 20C4.477 20 0 15.523 0 10C0 7.86401 0.67 5.88401 1.81 4.26001L5 10H2C1.99987 11.5684 2.46075 13.1022 3.32534 14.4108C4.18992 15.7193 5.42007 16.7449 6.86282 17.3599C8.30557 17.9749 9.89729 18.1523 11.44 17.87C12.9828 17.5877 14.4085 16.8581 15.54 15.772L16.537 17.567Z"
            fill-gray-400
          />
        </svg>
      </button>
      <button
        v-if="isDownload"
        rounded-md
        w-9
        h-9
        flex
        items-center
        justify-center
        @click="emit('download')"
      >
        <svg
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9999 11V16.585L14.8279 14.757L16.2429 16.172L11.9999 20.414L7.75689 16.172L9.17189 14.757L10.9999 16.585V11H12.9999ZM11.9999 2.2216e-08C13.7169 8.17699e-05 15.374 0.631114 16.6561 1.77312C17.9382 2.91512 18.756 4.48846 18.9539 6.194C20.1982 6.53332 21.2836 7.29911 22.0206 8.35753C22.7575 9.41595 23.099 10.6997 22.9855 11.9844C22.872 13.2691 22.3106 14.473 21.3995 15.3858C20.4883 16.2986 19.2854 16.8622 18.0009 16.978V14.964C18.4611 14.8983 18.9035 14.7416 19.3025 14.503C19.7014 14.2644 20.0488 13.9487 20.3245 13.5744C20.6001 13.2001 20.7984 12.7746 20.9078 12.3228C21.0172 11.8711 21.0355 11.402 20.9616 10.9431C20.8878 10.4841 20.7232 10.0445 20.4776 9.64985C20.232 9.2552 19.9102 8.91342 19.5311 8.64447C19.152 8.37552 18.7231 8.18479 18.2694 8.08341C17.8158 7.98203 17.3465 7.97203 16.8889 8.054C17.0455 7.32489 17.037 6.56997 16.8641 5.84455C16.6912 5.11913 16.3582 4.44158 15.8895 3.86153C15.4208 3.28147 14.8283 2.81361 14.1554 2.49219C13.4824 2.17078 12.7461 2.00397 12.0004 2.00397C11.2546 2.00397 10.5183 2.17078 9.84542 2.49219C9.1725 2.81361 8.57999 3.28147 8.1113 3.86153C7.64261 4.44158 7.3096 5.11913 7.13668 5.84455C6.96375 6.56997 6.95528 7.32489 7.11189 8.054C6.19955 7.88267 5.25651 8.08079 4.49024 8.60476C3.72396 9.12874 3.19722 9.93566 3.02589 10.848C2.85456 11.7603 3.05268 12.7034 3.57666 13.4697C4.10063 14.2359 4.90755 14.7627 5.81989 14.934L5.99989 14.964V16.978C4.71534 16.8623 3.5123 16.2989 2.60103 15.3862C1.68976 14.4735 1.12822 13.2696 1.01457 11.9848C0.900915 10.7001 1.24237 9.41628 1.97926 8.35777C2.71615 7.29926 3.8016 6.53339 5.04589 6.194C5.2436 4.48838 6.0613 2.91491 7.34347 1.77287C8.62565 0.63082 10.2829 -0.000136703 11.9999 2.2216e-08Z"
            fill-gray-400
          />
        </svg>
      </button>
      <button
        v-if="filterable"
        rounded-md
        w-9
        h-9
        flex
        items-center
        justify-center
        @click="emit('filter')"
      >
        <svg
          width="16"
          height="19"
          viewBox="0 0 16 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11V17L6 19V11L0 2V0H16V2L10 11ZM2.404 2L8 10.394L13.596 2H2.404Z"
            fill-gray-400
          />
        </svg>
      </button>
      <div v-if="simpleSearch" relative>
        <input
          :value="search"
          type="text"
          placeholder="Qanday ma’lumot qidiramiz?"
          class="py-2.5"
          rounded-md
          pr-4
          pl-9
          max-w-100
          border
          outline-none
          border-gray-400
          focus:border-green
          @keyup.enter="handleSearchChange"
          @keyup.esc="clearSearch"
        />

        <svg
          absolute
          left-3
          top-3
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0257 12.8475L17.5948 16.4158L16.4157 17.595L12.8473 14.0258C11.5196 15.0901 9.86817 15.669 8.1665 15.6666C4.0265 15.6666 0.666504 12.3066 0.666504 8.16663C0.666504 4.02663 4.0265 0.666626 8.1665 0.666626C12.3065 0.666626 15.6665 4.02663 15.6665 8.16663C15.6689 9.86829 15.09 11.5197 14.0257 12.8475ZM12.354 12.2291C13.4116 11.1415 14.0022 9.68365 13.9998 8.16663C13.9998 4.94329 11.389 2.33329 8.1665 2.33329C4.94317 2.33329 2.33317 4.94329 2.33317 8.16663C2.33317 11.3891 4.94317 14 8.1665 14C9.68353 14.0023 11.1414 13.4117 12.229 12.3541L12.354 12.2291Z"
            fill="#8896A1"
          />
        </svg>
      </div>
      <slot name="search-append" />
    </div>
    <div v-if="is_title" text-center class="w-2/4">
      <span text-18px color-black>{{ title }}</span>
    </div>
    <slot name="pagination-prepend" />
    <slot name="pagination">
      <div flex items-center gap-x-2 class="pagination">
        <q-btn
          v-if="scope?.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope?.isFirstPage"
          @click="scope?.firstPage"
        />

        <q-btn
          color="grey-8"
          round
          dense
          flat
          :disable="scope?.isFirstPage"
          @click="scope?.prevPage"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.82783 7.00001L7.77783 2.05001L6.36383 0.636013L-0.000167847 7.00001L6.36383 13.364L7.77783 11.95L2.82783 7.00001Z"
              fill="#8896A1"
            />
          </svg>
        </q-btn>
        {{ scope?.pagination.page }}
        <q-btn
          color="grey-8"
          round
          dense
          flat
          :disable="scope?.isLastPage"
          @click="scope?.nextPage"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.17217 7.00001L0.222168 2.05001L1.63617 0.636013L8.00017 7.00001L1.63617 13.364L0.222168 11.95L5.17217 7.00001Z"
              fill="#8896A1"
            />
          </svg>
        </q-btn>

        <q-btn
          v-if="scope?.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope?.isLastPage"
          @click="scope?.lastPage"
        />

        <q-select
          :model-value="scope?.pagination.rowsPerPage"
          outlined
          dense
          options-dense
          :options="[5, 10, 15, 20, 25, 50, 100]"
        >
          <template #option="selectScope">
            <q-item v-bind="selectScope.itemProps">
              <q-item-section>
                <q-item-label>{{ selectScope.opt }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon
                  size="small"
                  :name="
                    !selectScope.selected
                      ? 'radio_button_unchecked'
                      : 'radio_button_checked'
                  "
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
button {
  path {
    fill: #8896a1;
    transition: all 0.3s ease;
  }

  &:hover {
    path {
      fill: #13cd61;
    }

    circle {
      stroke: #13cd61;
    }
  }
}

input:focus + svg {
  path {
    fill: #13cd61;
  }
}
</style>
