
export default {
    name: 'Order',

    template: `
    <div>
        <div class="panel-title"><strong>Orders</strong></div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">订单列表</h4>
                <table class="table">
                    <thead><tr><th>ID</th><th>用户</th><th>总价</th><th>地址</th><th>详情</th><th>追踪号码</th></tr></thead>
                    <tbody>
                        <tr v-for="o in orders">
                            <td>{{ o.id }}</td>
                            <td>{{ o.user }}</td>
                            <td>{{ o.total_price }}</td>
                            <td>{{ o.address.address_line1 + ' ' + o.address.city + ' ' + o.address.state + ' ' + o.address.city }}</td>
                            <td><ul><li v-for="item in getOrderDetail(o.items)">{{ item }}</li></ul></td>
                            <td>
                                <input type="text" placeholder="Tracking number" v-on:change="setTrackingNumber(o.id, $event)">
                                <button class="button is-primary" v-on:click="saveTrackingNumber(o)">保存</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </div>
        <div class="tile is-parent"></div>
    </div>
    `,

    computed: {
        orders () {
            return this.$store.getters.allOrders
        }
    },

    data () {
        return {
            trackingNumbers: {}
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
            this.$store.dispatch('shipOrder', {id: order.id, trackingNumber: this.trackingNumber[id.toString()]})
        },

        setTrackingNumber(id, e) {
            debugger
            this.$set(this.trackingNumbers, id.toString(), e.target.value)
        }
    },

    created () {
        this.$store.dispatch('getAllOrders')
    }
}