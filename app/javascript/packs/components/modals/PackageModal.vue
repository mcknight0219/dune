<template>
    <modal :visible="visible" @close="close" :title="title" transition="zoom">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}
                    <span class="icon"><i class="fa fa-circle" aria-hidden="true"></i></a></span>
                </p>
            </header>
            <section class="modal-card-body">
            
            </section>
        </div>
    </modal>
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

    data () {
        return {
            
        }
    },

    methods: {
        close () {
            this.$emit('close')
        }
    }    
}
</script>