<template>
    <card-modal :visible="visible" @close="close" :title="title" transition="zoom">
        <div class="content has-text-centered status-checker-bar">
            <span class="icon is-large status-checker">
                <i class="fa fa-circle" aria-hidden="true"></i>
                <strong>等待</strong>
            </span>
            <span class="icon is-large status-checker">
                <i class="fa fa-circle" aria-hidden="true"></i>
                <strong>收到</strong>
            </span>
            <span class="icon is-large status-checker">
                <i class="fa fa-circle" aria-hidden="true"></i>
                <strong>寄出</strong>
            </span>
        </div>
    
    </card-modal>
</template>

<style lang="scss">
.status-checker-bar {
    .status-checker {
        margin-right: 25px;
        flex: 1 1 auto;
        flex-direction: column;
    }
}
</style>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
    components: {
        CardModal
    },

    props: {
        package: Object,
        visible: Boolean,
        title: String
    },

    methods: {
        close() {
            this.$emit('close')
        }
    }
}

</script>