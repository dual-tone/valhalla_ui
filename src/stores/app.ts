import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {

    const snackBar = ref(false);
    const snackBarMessage = ref();

    const showMessage = (message: string) => {
        snackBar.value = true;
        snackBarMessage.value = message;
    }

    return {
        snackBar,
        snackBarMessage,
        showMessage
    }

})
