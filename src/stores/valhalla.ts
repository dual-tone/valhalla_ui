import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import type { ValhallaConfigInterface } from '@/types/store';
import type { TraceRoutePayload } from '@/types/valhalla';

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

        const response = await axios.post(url, payload, { headers });
        return response.data;
    }

    return {
        valhallaConfig,
        setValhallaConfig,
        loadValhallaConfig,
        traceRoute
    }

})
