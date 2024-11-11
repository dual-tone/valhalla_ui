import l from 'leaflet';
import { ref, type Ref } from 'vue';

export interface MapUtil {
    map: Ref<l.Map>;
    initMap: (el: string) => void;
}

export default function mapUtil(): MapUtil {
    let map = ref();

    const initMap = (el: string) => {
        const m = l.map(el).setView([51.505, -0.09], 13);
        map.value = m;
        l.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(m);
    }

    return {
        map,
        initMap
    }
}