<script setup lang="ts">
import { VApp } from 'vuetify/components/VApp'
import { VSnackbar } from 'vuetify/components/VSnackbar'
import { RouterView } from 'vue-router'
import { onBeforeMount, provide } from 'vue';
import { storeToRefs } from 'pinia';

import { useValhallaStore } from '@/stores/valhalla';
import { useAppStore } from '@/stores/app';
import mapUtil from '@/utils/map';

const appStore = useAppStore();
const valhallaStore = useValhallaStore();
const { snackBar, snackBarMessage } = storeToRefs(appStore);

onBeforeMount(valhallaStore.loadValhallaConfig);
provide('map', mapUtil());

</script>

<template>
  <VApp>
    <VSnackbar color="primary" v-model="snackBar" location="bottom right" position="static">
      {{ snackBarMessage }}
    </VSnackbar>
    <RouterView />
  </VApp>
</template>
