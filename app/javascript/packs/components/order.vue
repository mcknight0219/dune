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
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </article>
        </div>
        <OrderModalComponent :visible="showOrderModal" :order="selectedOrder" @close="closeModal"></OrderModalComponent>
        <TrackingModalComponent :visible="showTrackingModal" :order="selectedOrder" @close="closeModal"></TrackingModalComponent>
    </div>
</template>

<script>
import Vue from 'vue'
import OrderModal from './modals/OrderModal'
import TrackingModal from './modals/TrackingModal'

const OrderModalComponent = Vue.extend(OrderModal)
const TrackingModalComponent = Vue.extend(TrackingModal)

export default {
    components: {
        OrderModalComponent,
        TrackingModalComponent
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

        closeModal() {
            this.showTrackingModal = false
            this.showOrderModal = false
        }
    },

    created() {
        this.$store.dispatch('getAllOrders')
    }
}
</script>