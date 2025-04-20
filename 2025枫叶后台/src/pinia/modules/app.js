
const useAppStore = defineStore('app', {
    state: () => {
        return {
            isCollapse: false,
            showSetup: false
        }
    },
    actions: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        changeShowSetup() {
          this.showSetup=!this.showSetup
        }
    }
})

export default useAppStore
