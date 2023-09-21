<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const userInfo = ref({
  username: '',
  password: '',
})

const message = ref<string>('')
const loading = ref<boolean>(false)

const store = useAuthStore()
async function handleLogin() {
  if (loading.value)
    return
  loading.value = true
  try {
    await store.login(userInfo.value)
    router.push('/dashboard')
  }
  catch (error: any) {
    message.value
      = error?.response?.data?.message || 'Login yoki parol noto\'g\'ri kiritildi'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div min-h-full flex>
    <div w-full flex items-center justify-center class="login-page">
      <div

        flex flex-1 flex-col justify-center border border-gray-300 px-4 py-12 lg:flex-none lg:px-12 sm:px-6 xl:px-12
      >
        <div mx-auto max-w-sm w-full lg:w-96>
          <div>
            <h2 mt-6 text-center text-3xl font-extrabold text-green>
              Tizimga kirish
            </h2>
          </div>

          <div mt-12>
            <div mt-6>
              <form space-y-6 @submit.prevent="handleLogin">
                <div>
                  <label for="username" block text-sm font-medium text-gray-700>
                    Login
                  </label>
                  <div mt-1>
                    <input
                      id="username"
                      v-model="userInfo.username"
                      name="username"
                      placeholder="Login"
                      type="text"
                      autocomplete="username"

                      block w-full appearance-none border border-gray-300 rounded-md px-4 py-4 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500 placeholder-gray-400
                      @focus="message = ''"
                    >
                  </div>
                </div>

                <div space-y-1>
                  <label for="password" block text-sm font-medium text-gray-700>
                    Parol
                  </label>
                  <div mt-1>
                    <input
                      id="password"
                      v-model="userInfo.password"
                      placeholder="Parol"
                      name="password"
                      type="password"
                      autocomplete="current-password"

                      block w-full appearance-none border border-gray-300 rounded-md px-4 py-4 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500 placeholder-gray-400
                      @focus="message = ''"
                      @keyup.enter="handleLogin"
                    >
                  </div>
                </div>
                <div v-if="message" text-red space-y-1>
                  {{ message }}
                </div>
                
                <div>
                  <button
                    type="submit"

                    w-full flex justify-center border border-transparent rounded-md bg-green px-4 py-4 font-medium text-white shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green
                  >
                    Kirish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- <div>
        <img src="/assets/images/login-bg.png" alt="login-bg" max-h-100vh>
      </div> -->
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
  public: true
</route>

<style lang="scss" scoped>
.login-page {
  @apply gap-x-100px;

  @media screen and (max-width: 1400px) {
    @apply gap-x-0;
  }
}
</style>
