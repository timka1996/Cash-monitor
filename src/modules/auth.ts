import { createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import type { UserModule } from '~/types/types'

export const install: UserModule = ({
  router,
  app,
  isClient,
  initialState,
}) => {
  // Setup Pinia first
  // then use Pinia modue useAuthStore
  const pinia = createPinia()
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value
  const store = useAuthStore()

  router.beforeEach(async (to, from, next) => {
    if (to.meta.public) {
      if (localStorage.getItem('accessToken'))
        next('/')
      else next()
    }
    else {
      if (localStorage.getItem('accessToken')) {
        let isAuthorized = true

        if (to.meta.rule) {
          isAuthorized = (to.meta.rule as string)
            .split('|')
            .some(rule =>
              rule
                .split('.')
                .reduce(
                  (ac, rule) => (typeof ac === 'object' ? ac[rule] : ac),
                  store.getRules,
                ),
            )
        }

        if (isAuthorized)
          next()
        else next('/404')
      }
      else {
        next('/auth/login')
      }
    }
  })
}
