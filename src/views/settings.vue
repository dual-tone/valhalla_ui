<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { VTextField } from 'vuetify/components/VTextField'
import { VSwitch } from 'vuetify/components/VSwitch'
import { VSelect } from 'vuetify/components/VSelect'
import { VBtn } from 'vuetify/components/VBtn'
import { VContainer } from 'vuetify/components/VGrid'
import { VBanner } from 'vuetify/components/VBanner'
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useValhallaStore } from '@/stores/valhalla'
import { useAppStore } from '@/stores/app'
import type { ValhallaConfigInterface } from '@/types/store'

const formTemplateRef = ref();
const valhallaStore = useValhallaStore();
const appStore = useAppStore();
const { valhallaConfig } = storeToRefs(valhallaStore);

const form = ref<ValhallaConfigInterface>({
    valhallaUrl: '',
    isAuthRequired: false,
    authMethod: undefined,
    authBasicUsername: undefined,
    authBasicPassword: undefined,
})

const updateValhallaUrl = async () => {
    if (!form.value.valhallaUrl) return;

    const { valid, errors } = await formTemplateRef.value!.validate();

    console.log('Valid, errors');
    console.log(errors);

    if (!valid) return;

    appStore.showMessage("Valhalla URL updated successfully");
    valhallaStore.setValhallaConfig(form.value);
}

onBeforeMount(() => {
    if (valhallaConfig.value) form.value = valhallaConfig.value!;
})

</script>
<template>
    <VBanner text="Settings"></VBanner>
    <VContainer>
        <VForm @submit.prevent="updateValhallaUrl" ref="formTemplateRef">
            <VTextField
                :rules="[v => !!v || 'Item is required', v => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v) || 'Invalid URL']"
                label="Valhalla URL" v-model:model-value="form.valhallaUrl">
            </VTextField>
            <label class="text-caption">Authorization</label>
            <VSwitch label="Enable Authorization" v-model:model-value="form.isAuthRequired" hide-details></VSwitch>
            <template v-if="form.isAuthRequired">
                <VSelect label="Method" :items="['Basic']" v-model:model-value="form.authMethod"></VSelect>
            </template>
            <template v-if="form.isAuthRequired && form.authMethod == 'Basic'">
                <VTextField :rules="[v => !!v || 'Username is required']" label="Username"
                    v-model:model-value="form.authBasicUsername">
                </VTextField>
                <VTextField :rules="[v => !!v || 'Password is required']" type="password" label="Password"
                    v-model:model-value="form.authBasicPassword">
                </VTextField>
            </template>
            <VBtn type="submit" color="primary">Submit</VBtn>
        </VForm>
    </VContainer>
</template>