import { createPinia } from 'pinia'
import piniaPluginPersistence from 'pinia-plugin-persistedstate'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTagStore from './modules/tag'

const pinia = createPinia()
pinia.use(piniaPluginPersistence)

export { useAppStore, useUserStore, useTagStore }
export default pinia
