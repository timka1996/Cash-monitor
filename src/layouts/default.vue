<script lang="ts" setup>
// import PasswordChangeForm from "~/components/PaswordChangeForm.vue";
import themeConfig from '~/config/theme'
import { useVariablesStore } from '~/stores/variables'

const { dense } = themeConfig

const margin = computed(() => {
  return dense ? 10 : 24
})
function calculatePageHeight(offset: number) {
  return {
    minHeight: offset ? `calc(100vh - ${margin.value + offset}px)` : '100vh',
  }
}
 const variablesStore = useVariablesStore()
 function logout(){
  localStorage.clear()
  location.reload()
 }
/*const authStore = useAuthStore()

const passwordChangeFormRef = ref<InstanceType<
  typeof PasswordChangeForm
> | null>(null)

function showPasswordChangeForm() {
  passwordChangeFormRef.value?.open()
} */
</script>

<template>
  <q-layout view="lhh LpR lff">
    <q-header bordered bg-white class="text-gray">
      <div w-full flex>
        <q-toolbar>
          <q-toolbar-title>{{ variablesStore.pageTitle }}</q-toolbar-title>
          <q-space />
          <!--  <account-menu @show-password-form="showPasswordChangeForm" /> -->
        </q-toolbar>
        <div class="sortbar row my-4">
          <div class="col-2 mr-4">
            <q-btn color="primary" icon="logout" @click="logout"></q-btn>
          </div>
      </div>
      </div>
    </q-header>

    <sidebar />
    <q-page-container bg-gray-100>
      <q-page

        :style-fn="calculatePageHeight"
        :class="dense ? 'm-10px' : 'm-24px'"
        mb-0 rounded-4px bg-white
      >
        <router-view #="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name || 'fallback-route-name'">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
