import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import type { ValhallaConfigInterface } from '@/types/store';
import type { Alternate, LocatePayload, LocateResponse, RouteReponse, SourceToTargetPayload, SourceToTargetResponse, TraceRouteJson, TraceRoutePayload, TraceRouteResponse, Trip } from '@/types/valhalla';

export const useValhallaStore = defineStore('valhallaStore', () => {

    const valhallaConfig = ref<ValhallaConfigInterface>();

    const setValhallaConfig = (config: ValhallaConfigInterface) => {
        valhallaConfig.value! = config;
        localStorage.setItem('valhalla_config', JSON.stringify(config));
    }

    const loadValhallaConfig = () => {
        const config = localStorage.getItem('valhalla_config');
        if (config) {
            valhallaConfig.value = JSON.parse(config);
        } else {
            setValhallaConfig({
                valhallaUrl: 'http://localhost:8002',
                isAuthRequired: false,
            });
        }
    }

    const traceRoute = async (payload: TraceRoutePayload) => {
        const url = `${valhallaConfig.value!.valhallaUrl}/trace_route`;
        const headers = {
            'Content-Type': 'application/json'
        } as Record<string, string>;

        if (valhallaConfig.value!.isAuthRequired && valhallaConfig.value!.authMethod == 'Basic') {
            headers['Authorization'] = 'Basic ' + btoa(valhallaConfig.value!.authBasicUsername + ':' + valhallaConfig.value!.authBasicPassword);
        }

        const { data } = await axios.post<TraceRouteResponse>(url, payload, { headers });
        return data;
    }

    const generateRoute = async (payload: TraceRouteJson) => {
        const url = `${valhallaConfig.value!.valhallaUrl}/route?json=${JSON.stringify(payload)}`;
        const headers = {
            'Content-Type': 'application/json'
        } as Record<string, string>;

        if (valhallaConfig.value!.isAuthRequired && valhallaConfig.value!.authMethod == 'Basic') {
            headers['Authorization'] = 'Basic ' + btoa(valhallaConfig.value!.authBasicUsername + ':' + valhallaConfig.value!.authBasicPassword);
        }

        const { data } = await axios.get<RouteReponse>(url, { headers });
        return data;
    }

    const getMatrix = async (payload: SourceToTargetPayload) => {
        const url = `${valhallaConfig.value!.valhallaUrl}/sources_to_targets?json=${JSON.stringify(payload)}`;
        const headers = {
            'Content-Type': 'application/json'
        } as Record<string, string>;

        if (valhallaConfig.value!.isAuthRequired && valhallaConfig.value!.authMethod == 'Basic') {
            headers['Authorization'] = 'Basic ' + btoa(valhallaConfig.value!.authBasicUsername + ':' + valhallaConfig.value!.authBasicPassword);
        }

        const { data } = await axios.get<SourceToTargetResponse>(url, { headers });
        return data;
    }

    const locate = async (payload: LocatePayload) => {
        const url = `${valhallaConfig.value!.valhallaUrl}/locate?json=${JSON.stringify(payload)}`;
        const headers = {
            'Content-Type': 'application/json'
        } as Record<string, string>;

        if (valhallaConfig.value!.isAuthRequired && valhallaConfig.value!.authMethod == 'Basic') {
            headers['Authorization'] = 'Basic ' + btoa(valhallaConfig.value!.authBasicUsername + ':' + valhallaConfig.value!.authBasicPassword);
        }

        const { data } = await axios.get<LocateResponse[]>(url, { headers });
        return data;
    }

    const decodeShape = function (shape: string, precision?: number) {
        var index = 0,
            lat = 0,
            lng = 0,
            coordinates = [],
            shift = 0,
            result = 0,
            byte = null,
            latitude_change,
            longitude_change,
            factor = Math.pow(10, precision || 6);

        // Coordinates have variable length when encoded, so just keep
        // track of whether we've hit the end of the string. In each
        // loop iteration, a single coordinate is decoded.
        while (index < shape.length) {

            // Reset shift, result, and byte
            byte = null;
            shift = 0;
            result = 0;

            do {
                byte = shape.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            shift = result = 0;

            do {
                byte = shape.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            lat += latitude_change;
            lng += longitude_change;

            coordinates.push([lat / factor, lng / factor]);
        }

        return coordinates;
    };

    const getPolylines = function (trip: Trip, alternates: Alternate[]) {
        const polylines = trip.legs.map(leg => {
            return decodeShape(leg.shape);
        });
        const alternatePolylines = alternates.map((l) => l.trip.legs.map((l) => decodeShape(l.shape)))

        return { polylines, alternatePolylines };
    }

    return {
        valhallaConfig,
        setValhallaConfig,
        loadValhallaConfig,

        traceRoute,
        generateRoute,
        getMatrix,
        locate,

        decodeShape,
        getPolylines,
    }

})
