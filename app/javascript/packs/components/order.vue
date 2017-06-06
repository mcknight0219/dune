<template>
    <div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <nav class="level">
                    <div class="level-left">
                        <strong>订单</strong>
                    </div>
                    <div class="level-right"><input type="text" class="input" placeholder="订单号码，产品名称等信息"></div>
                </nav>
                <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>订单号</th>
                            <th>日期</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="o in orders">
                            <td>
                                <a class="button is-link" @click="openOrderModal(o)">{{ o.id }}</a>
                            </td>
                            <td>{{ new Date(o.created_at).toISOString().slice(0,10) }}</td>
                            <td>
                                <a class="is-icon" @click="openTrackingModal(o)">
                                    <i class="fa fa-check-square-o" aria-hidden="true"></i>
                                </a>
                                <a class="is-icon"><i class="fa fa-trash"></i></a>
                                <a v-if="!hasIdInfo(o.address)" @click="openUploadModal(o)"><i class="fa fa-bell-o"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </article>
        </div>
        <UploadModalComponent :visible="showUploadModal" @close="closeModal" :orderOrPackage="selectedOrder"></UploadModalComponent>
        <OrderModalComponent :visible="showOrderModal" :order="selectedOrder" @close="closeModal"></OrderModalComponent>
        <TrackingModalComponent :visible="showTrackingModal" :order="selectedOrder" @close="closeModal"></TrackingModalComponent>
    </div>
</template>

<script>
import Vue from 'vue'
import OrderModal from './modals/OrderModal'
import TrackingModal from './modals/TrackingModal'
import UploadModal from './modals/UploadModal'

const OrderModalComponent = Vue.extend(OrderModal)
const TrackingModalComponent = Vue.extend(TrackingModal)
const UploadModalComponent = Vue.extend(UploadModal)

export default {
    components: {
        OrderModalComponent,
        TrackingModalComponent,
        UploadModalComponent
    },

    computed: {
        orders() {
            return this.$store.getters.allOrders
        }
    },

    data() {
        return {
            trackingNumbers: {},
            showTrackingModal: false,
            showOrderModal: false,
            showUploadModal: false,
            selectedOrder: {}
        }
    },

    methods: {
        getOrderDetail(items) {
            let result = []
            for (let sku in items) {
                result.push(sku + 'x' + items[sku])
            }
            return result
        },

        saveTrackingNumber(order) {
            this.$store.dispatch('shipOrder', { id: order.id, trackingNumber: this.trackingNumber[id.toString()] })
        },

        setTrackingNumber(id, e) {
            this.$set(this.trackingNumbers, id.toString(), e.target.value)
        },

        openTrackingModal (o) {
            this.selectedOrder = o
            this.showTrackingModal = true
        },

        openOrderModal(o) {
            this.selectedOrder = o
            this.showOrderModal = true
        },

        openUploadModal(o) {
            this.selectedOrder = o
            this.showUploadModal = true
        },

        closeModal() {
            this.showTrackingModal = false
            this.showOrderModal = false
            this.showUploadModal = false
        },

        hasIdInfo(addr) {
            return addr.id_number !== null && addr.id_number.length > 0 && addr.id_front.indexOf('missing') < 0 && addr.id_back.indexOf('missing') < 0
        },

        idPhotoUploadUrl(o) {
            return '/photos/order/' + o.id
        }
    },

    created() {
        this.$store.dispatch('getAllOrders')
    }
}
</script>