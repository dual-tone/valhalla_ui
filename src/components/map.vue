<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import type { MapUtil } from '@/utils/map';

const map = inject<MapUtil>("map");

const initMap = () => {
    if (!map) return;
    map.initMap('map');
}

onMounted(() => {
    initMap();
})

</script>
<template>
    <div id="map" class="fill-height"></div>
</template>