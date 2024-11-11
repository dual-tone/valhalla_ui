<script setup lang="ts">
import { VContainer } from 'vuetify/components/VGrid'
import { VBanner } from 'vuetify/components/VBanner'
import { VBtn } from 'vuetify/components/VBtn'

import Editor from '@/components/editor.vue';
import { inject, ref } from 'vue';
import type { MapUtil } from '@/utils/map';
import { useValhallaStore } from '@/stores/valhalla';

const json = ref();
const map = inject<MapUtil>("map");

const valhallaStore = useValhallaStore();

const submit = async () => {
    if (json.value === undefined || json.value == "") return;

    console.log(json.value);
    console.log(map?.map.value.getBounds());
    await valhallaStore.traceRoute(json.value);
}

</script>
<template>
    <VBanner text="Trace Route"></VBanner>
    <VContainer>
        <Editor @update:model-value="(v) => json = v"></Editor>
        <VBtn @click="submit" color="primary mt-3">Submit</VBtn>
    </VContainer>
</template>