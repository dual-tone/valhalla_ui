import l, { polyline } from 'leaflet';
import { ref, type Ref } from 'vue';

export interface MapUtil {
    map: Ref<l.Map>;
    initMap: (el: string) => void;
    drawPolyLines: (map: L.Map, polylines: number[][][], alternatePolylines: number[][][][]) => void;
}

export default function mapUtil(): MapUtil {
    let map = ref();

    const initMap = (el: string) => {
        const m = l.map(el).setView([9.9178343, 78.0815385], 11);
        map.value = m;
        l.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);
    }

    const drawPolyLines = (map: L.Map, polylines: number[][][], alternatePolylines: number[][][][]) => {
        const polylineLayer = polyline(polylines as any, {
            color: 'blue',
            weight: 5,
            opacity: 0.7,
            smoothFactor: 1
        }).addTo(map);

        if (alternatePolylines) {
            alternatePolylines.forEach((layers) => {
                polyline(layers as any, {
                    color: 'red',
                    weight: 5,
                    opacity: 0.7,
                    smoothFactor: 1
                }).addTo(map);
            });
        }

        map.fitBounds(polylineLayer.getBounds());
    }

    return {
        map,
        initMap,
        drawPolyLines
    }
}