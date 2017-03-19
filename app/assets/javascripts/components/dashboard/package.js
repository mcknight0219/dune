export default {
    name: 'Package',

    template: `
<div>
  <div class="panel-title">
    <strong>Packages</strong>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child box">
    <h4 class="title">邮寄列表</h4>
    <table class="table">
        <thead><tr><th>订单号</th><th>邮寄地址</th><th>证件图片</th><th>包裹详情</th><th>收到</th><th>寄出</th></tr></thead>
        <tbody>
        <tr v-for="p in packages">
            <td style="font-weight: 500">{{ p.serial  }}</td>
            <td>
                <p style="font-weight:600">{{ p.address.name  }}<p>
                <p>{{ p.address.address_line1 }}</p>
                <p>{{ p.address.city + ',' + p.address.state + ',' + p.address.country}} <span style="font-weight: 500">{{ p.address.post_code}}</span></p>
            </td>
            <td>
                <a v-bind:href="idFrontUrl(p)">正面</a>
                <a v-bind:href="idBackUrl(p)">背面</a>
            </td>
            <td>
                <ul style="list-style: none">
                    <li v-for="item in p.package_items">{{ item.name + ' x ' + item.quantity }}</li>
                </ul>
            </td>  
            <td style="vertical-align: middle">
                <input type="checkbox" v-model="p.is_received" v-on:click="updateReceivedStatus(p)">
                
            </td>
            <td style="vertical-align: middle">
                <input type="checkbox" v-model="p.is_shipped" v-on:click="updateShippedStatus(p)">
                
            </td>  
        </tr>    
        </tbody>
      </table>
  </div>
</div>
    `,

    computed: {
        packages () {
            return this.$store.getters.allPackages
        }
    },

    data() {
        return {}
    },

    methods: {
        idFrontUrl(p) {
            return p.address.id_front
        },

        idBackUrl(p) {
            return p.address.id_back
        },

        updateReceivedStatus(p) {
            console.log(p.is_received)
        },

        updateShippedStatus(p) {
            console.log(p.is_shipped)
        }

    },

    created() {
        this.$store.dispatch('getAllPackages')
    }
}
