export default {
    name: 'Package',

    template: `
        <div>
            <div class="panel-title">
                <strong>Packages</strong>
            </div>
            <div class="tile is-ancestor">
                <div class="tile is-parent is-6">
                <article class="tile is-child box">
                <h4 class="title">邮寄列表</h4>
                <table class="table">
                    <thead><tr><th>订单号</th><th>查看详情</th><th>收到</th><th>寄出</th></tr></thead>
                    <tbody>
                        <tr v-for="p in packages">
                          <td>{{ p.serial }}</td>
                          <td><a v-on:click="openModal(p.address)">{{ p.address.name }}</a></td>
                          <td><input type="checkbox"></td>
                          <td><input type="checkbox"></td>  
                          <td></td>
                        </tr>    
                    </tbody>
                </table>
                </article>
                </div>
                <div class="tile is-parent is-4">
                <article class="tile is-child box">
                <ul>
                          <li><h5>{{ addressInModal.name || '姓名' }}</h5></li>
                          <li><span>{{ addressInModal.address_line1 }}</span></li>
                          <li><span>{{ addressInModal.cityState }}</span></li>
                          <li><span>{{ addressInModal.country }}</span></li>
                          <li><span>Phone number: {{ addressInModal.mobile }}</span></li>
                         
                </ul>
            </article>
</div>
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                 <ol>
                   <li>FishOil 1</li>
                 </ol>
            </article>
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
