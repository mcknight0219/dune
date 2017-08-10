<template>
    <modal :visible="visible" @close="close">
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input type="text" class="input" v-model="trackingNumber">
                        </p>
                        <p class="control">
                            <a class="button is-icon" @click="saveTrackingNumber">
                                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                            </a>
                        </p>
                    </div>
                    <div class="notification is-primary" v-if="status === 'success'">
                        已更新包裹查询号
                    </div>
                    <div class="notification is-warning" v-if="status === 'failure'">
                        无法更更新包裹查询号
                    </div>
                    <p>请输入邮寄的包裹查询号码，以便用户可以查询</p>
                </div>
            </article>
        </div>
    </modal>
</template>

<style lang="scss">
</style>

<script>
import {Modal} from 'vue-bulma-modal'

export default {
    props: {
        order: {
            type: Object,
            default: () => ({})
        },

        visible: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        order () {
            this.trackingNumber = this.order.tracking_number
        }
    },

    data() {
        return {
            trackingNumber: null
        }
    },

    computed: {
        status () {
            return this.$store.getters.shipOrderStatus
        }
    },

    components: {
        Modal
    },

    methods: {
        saveTrackingNumber () {
            if (this.trackingNumber !== null) {
                this.$store.dispatch('shipOrder', {id: this.order.id, trackingNumber: this.trackingNumber})
            }
        },

        close () {
            this.trackingNumber = null
            this.$store.dispatch('resetShipOrderStatus')
            this.$emit('close')
        }
    }
}
</script>
