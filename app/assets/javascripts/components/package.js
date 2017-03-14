export default {
    name: 'Package',

    template: `
        <div>
            <div class="panel-title">
                <strong>Packages</strong>
            </div>
            <article class="tile is-child box">
                <h4 class="title">邮寄列表</h4>
                <table class="table">
                    <thead><tr><th>物品详情</th><th>目的地</th><th>上门取件</th><th>收到</th><th>寄出</th></tr></thead>
                    <tbody>
                        <tr v-for="p in packages">
                          <td>
                            <ol v-for="it in p.package_items">
                              <li>{{ it.name }} {{ it.quantity }}</li>
                            </ol>
                          </td>
                          <td><span v-on:click="openModal(p.address)">{{ p.address.name }}</span></td>
                          <td>{{ p.pickup ? p.pickup_address : 'No' }}</td>
                          <td><input type="checkbox"></td>
                          <td><input type="checkbox"></td>  
                          <td></td>
                        </tr>    
                    </tbody>
                </table>
            </article>
            <div class="modal animated" v-bind:class="{ 'is-active': showModal }">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">邮寄地址</header>
                <section class="modal-card-body">
                    <div class="block">
                        <ul>
                          <li><h5>{{ addressInModal.name }}</h5></li>
                          <li><span>{{ addressInModal.address_line1 }}</span></li>
                          <li><span>{{ addressInModal.cityState }}</span></li>
                          <li><span>{{ addressInModal.country }}</span></li>
                          <li><span>Phone number: {{ addressInModal.mobile }}</span></li>
                          <li>身份证正面</li>
                          <li>身份证背面</li>
                        </ul>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <a class="button is-primary" v-on:click="hideModal()">确定</a>
                </footer>
            </div>
        </div>

        </div>
    `,

    computed: {
        packages () {
            return this.$store.getters.allPackages
        }
    },

    data() {
      return {
        showModal: false,
        addressInModal: {}
      }
    },

    methods: {
      openModal(addr) {
        this.addressInModal = addr
        this.showModal = true
      },

      hideModal() {
        this.addressInModal = {}
        this.showModal = false
      }
    },

    created() {
      this.$store.dispatch('getAllPackages')
    }
}
