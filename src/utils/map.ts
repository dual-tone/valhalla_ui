import { polyline, marker, map as LeafletMap, tileLayer, icon, type Map, type Marker, type PolylineOptions, Polyline } from 'leaflet';
import { ref, type Ref } from 'vue';

export interface MarkerDetail<T> { id: string, meta?: T };
export interface PolylineDetail<T> { id: string, meta?: T };

export interface MapUtil<
    MarkerMeta = Record<string, any>,
    PolylineMeta = Record<string, any>
> {
    map: Ref<Map | undefined>;
    markers: Ref<MarkerDetail<MarkerMeta | Record<string, any>>[]>;
    polylines: Ref<PolylineDetail<PolylineMeta | Record<string, any>>[]>;
    initMap: (el: string) => void;
    addPolyLines: (polylines: number[][][], options?: PolylineOptions, meta?: Record<string, any>) => void;
    addMarker: (latitude: number, longitude: number, options?: { icon?: 'source' | 'destination', meta?: Record<string, any> }) => Marker;
    removeMarker: (id: string) => void;
}

export default function mapUtil() {
    let map = ref<Map | undefined>();

    let markers = ref<MarkerDetail<Record<string, any>>[]>([]);
    let polylines = ref<PolylineDetail<Record<string, any>>[]>([])

    const initMap = (el: string) => {
        const m = LeafletMap(el).setView([9.9178343, 78.0815385], 11);
        map.value = m;
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);
    }

    const addMarker = (latitude: number, longitude: number, options?: {
        icon?: 'source' | 'destination'
        meta?: Record<string, any>
    }) => {
        /**
         * Default icon configuration for map markers.
         *
         * @remarks
         * This configuration sets the icon URL to 'marker.svg' and specifies the size and anchor point of the icon.
         *
         * @constant
         * @type {Icon}
         *
         * @property {string} iconUrl - The URL of the icon image.
         * @property {number[]} iconSize - The size of the icon in pixels. The first element is the width, and the second element is the height.
         * @property {number[]} iconAnchor - The point of the icon which will correspond to the marker's location. The first element is the x-coordinate, and the second element is the y-coordinate.
         *
         * @example
         * The iconAnchor is calculated as follows:
         * - x-coordinate: half of the icon width (32 / 2 = 16)
         * - y-coordinate: full height of the icon (32)
         */
        var sourceIcon = icon({
            iconUrl: 'marker_source.svg',
            iconSize: [32, 32], // size of the icon
            iconAnchor: [16, 32] // point of the icon which will correspond to marker's location
        });
        var destinationIcon = icon({
            iconUrl: 'marker_destination.svg',
            iconSize: [32, 32], // size of the icon
            iconAnchor: [16, 32] // point of the icon which will correspond to marker's location
        });
        var defaultIcon = icon({
            iconUrl: 'marker.svg',
            iconSize: [32, 32], // size of the icon
            iconAnchor: [16, 32] // point of the icon which will correspond to marker's location
        });

        const m = marker([latitude, longitude], {
            icon: options?.icon === 'source' ? sourceIcon : options?.icon === 'destination' ? destinationIcon : defaultIcon
        }).addTo(map.value!);

        markers.value.push({
            id: m._leaflet_id.toString(),
            meta: options?.meta
        });
    }

    const removeMarker = (id: string) => {
        map.value!.eachLayer((layer) => {
            if (layer._leaflet_id.toString() === id) {
                const layerIndex = markers.value.findIndex((marker) => marker.id === id);

                map.value!.removeLayer(layer);
                markers.value.splice(layerIndex, 1);
            }
        });
    }

    const addPolyLines = (p: number[][][], options?: PolylineOptions, meta?: Record<string, any>) => {
        const polylineLayer = polyline(p as any, {
            color: options?.color ?? 'blue',
            weight: options?.weight ?? 5,
            opacity: options?.opacity ?? 0.7,
            smoothFactor: options?.smoothFactor ?? 1
        }).addTo(map.value!);

        polylines.value.push({
            id: polylineLayer._leaflet_id.toString(),
            meta: meta
        });

        map.value!.fitBounds(polylineLayer.getBounds());
    }

    return {
        map,
        markers,
        polylines,
        initMap,
        addMarker,
        removeMarker,
        addPolyLines
    }
}