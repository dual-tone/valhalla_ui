<script lang="ts" setup>
import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { onMounted, useTemplateRef } from "vue";
import { json } from '@codemirror/lang-json';

const editorTemplateRef = useTemplateRef('editorTemplateRef');
const emit = defineEmits(['update:modelValue']);

const initEditor = () => {
    let startState = EditorState.create({
        extensions: [
            keymap.of(defaultKeymap),
            basicSetup,
            json(),
            EditorView.updateListener.of(update => {
                if (update.changes) {
                    const v = update.state.doc.toString();
                    emit('update:modelValue', v || "");
                }
            })
        ],
    })

    new EditorView({
        state: startState,
        parent: editorTemplateRef.value as HTMLElement,
    })
}

onMounted(() => {
    initEditor();
})

</script>
<template>
    <div id="editor" ref="editorTemplateRef"></div>
</template>
<style>
.ͼ2 .cm-gutters {
    border-right: none;
    background-color: transparent;
}
</style>