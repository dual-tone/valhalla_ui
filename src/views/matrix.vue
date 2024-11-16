<script setup lang="ts">
import { VContainer } from 'vuetify/components/VGrid'
import { VBanner } from 'vuetify/components/VBanner'
import { VList, VListItem, VListItemTitle } from 'vuetify/components/VList'
import { VBtn } from 'vuetify/components/VBtn'
import { VBtnToggle } from 'vuetify/components/VBtnToggle'
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { type LeafletMouseEvent } from 'leaflet';

import type { MapUtil } from '@/utils/map';
import { useValhallaStore } from '@/stores/valhalla';
import { DeleteFilled } from '@/components/icons/filled'
import type { SourcesToTarget, SourceToTargetPayload } from '@/types/valhalla'
import Location from '@/components/location.vue'

const map = inject<MapUtil<
    { selectionType: number, lat: number, lng: number },
    SourcesToTarget
>>("map");

const formTemplateRef = ref();
const valhallaStore = useValhallaStore();
const form = ref<{ selectionType: number }>({
    selectionType: 0,
})

const sources = computed(() => map?.markers.value.filter(marker => marker.meta!.selectionType === 0));
const destinations = computed(() => map?.markers.value.filter(marker => marker.meta!.selectionType === 1));

const onHandleClick = (e: LeafletMouseEvent) => {
    map?.addMarker(e.latlng.lat, e.latlng.lng, {
        icon: form.value.selectionType === 0 ? 'source' : 'destination',
        meta: {
            selectionType: form.value.selectionType,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
        }
    });
}

const generateRoute = async () => {
    const reqJson = {
        "sources": sources.value!.map(source => ({
            "lat": source.meta!.lat,
            "lon": source.meta!.lng
        })),
        "targets": destinations.value!.map(destination => ({
            "lat": destination.meta!.lat,
            "lon": destination.meta!.lng
        })),
        "costing": "auto",
        "shape_format": "polyline6",
    } as SourceToTargetPayload;
    const data = await valhallaStore.getMatrix(reqJson);

    const polylinesData = data.sources_to_targets.map((sourceToTarget) => {
        return sourceToTarget.map((source) => {
            return {
                meta: source,
                polyline: valhallaStore.decodeShape(source.shape),
            };
        });
    });

    polylinesData.forEach((polyline) => {
        polyline.forEach((source) => {
            map?.addPolyLines([source.polyline], {
                color: "#" + (Math.floor(Math.random() * 128)).toString(16).padStart(2, '0') +
                    (Math.floor(Math.random() * 128)).toString(16).padStart(2, '0') +
                    (Math.floor(Math.random() * 128)).toString(16).padStart(2, '0'),
            }, source.meta);
        });
    });
}

onMounted(() => map?.map.value!.addEventListener('click', onHandleClick));
onMounted(() => map?.clearAllLayers());

onBeforeUnmount(() => map?.map.value!.removeEventListener('click', onHandleClick));

</script>
<template>
    <VBanner text="Matrix"></VBanner>
    <VContainer>
        <div>
            <VBtnToggle v-model:model-value="form.selectionType">
                <VBtn slim>
                    Source
                </VBtn>
                <VBtn slim>
                    Destination
                </VBtn>
            </VBtnToggle>
        </div>

        <div>
            <VList v-if="form.selectionType === 0">
                <Location v-for="(source, i) in sources" :lat="source.meta?.lat" :lng="source.meta?.lng" enableDelete
                    @on:delete="map?.removeMarker(source.id)" class="px-0 my-1">
                </Location>
            </VList>
            <VList v-else>
                <Location v-for="(destination, i) in destinations" :lat="destination.meta?.lat"
                    :lng="destination.meta?.lng" enableDelete @on:delete="map?.removeMarker(destination.id)"
                    class="px-0 my-1">
                </Location>
            </VList>
            <VBtn color="primary" @click="generateRoute" class="mt-3">
                Generate Route
            </VBtn>
        </div>
    </VContainer>
</template>