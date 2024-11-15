<script setup lang="ts">
import { VContainer } from 'vuetify/components/VGrid'
import { VBanner } from 'vuetify/components/VBanner'
import { VBtn } from 'vuetify/components/VBtn'

import { inject, ref } from 'vue';
import type { MapUtil } from '@/utils/map';
import { useValhallaStore } from '@/stores/valhalla';

const map = inject<MapUtil>("map");

const valhallaStore = useValhallaStore();



</script>
<template>
    <VBanner text="Isochrone"></VBanner>
    <VContainer>
    </VContainer>
</template>