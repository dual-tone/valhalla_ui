import * as L from 'leaflet';

declare module 'leaflet' {
    interface Layer {
        _leaflet_id: string;
    }
}