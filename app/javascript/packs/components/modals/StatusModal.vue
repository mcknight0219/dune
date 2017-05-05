<template>
    <modal :visible="visible" @close="close" :title="title" transition="zoom"></modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'

export default {
    components: {
        Modal
    },

    props: {
        package: Object,
        visible: Boolean,
        title: String
    },

    methods: {
        close () {
            this.$emit('close')
        }
    }
}

</script>