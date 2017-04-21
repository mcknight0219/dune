export default {
    name: 'Package',

    template: `
<div>
  <div class="panel-title">
    <strong>寄件管理</strong>
  </div>
  
  <article class="tile is-parent">
    <article class="tile is-child box">
        <nav class="level">
            <div class="level-left"><h4 class="title">邮寄列表</h4></div> 
            <div class="level-right"><input type="text" class="input" placeholder="订单号码，名字等" v-model="q"></div> 
        </nav>
        
        <table class="table">
            <thead>
                <tr>
                    <th>订单号 <i class="fa" v-bind:class="{ 'fa-sort-asc': sortID === 'asc', 'fa-sort-desc': sortID === 'desc' }" style="vertical-align: middle" v-on:click="toggleSortID"></i></th>
                    <th>时间 <i class="fa" v-bind:class="{ 'fa-sort-asc': sortTime === 'asc', 'fa-sort-desc': sortTime === 'desc' }" style="vertical-align: middle" v-on:click="toggleSortTime"></i></th>
                    <th>邮寄地址</th><th>包裹详情</th><th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in packages">
                    <td style="font-weight: 500">{{ p.serial  }}</td>
                    <td>{{ new Date(p.created_at).toLocaleString() }}</td>
                    <td>
                        <div class="address-list">
                            <p>名字：<span class="receivername">{{ p.address.name  }}</span><p>
                            <p>地址：<span class="address">{{ p.address.address_line1 + ' ' + p.address.city + ' ' + p.address.state }}</span></p>
                            <p>电话：<span class="mobile">{{ p.address.mobile }}</span></p>
                            <span>
                                身份证号：{{ p.address.id_number }}
                                <a v-bind:href="idFrontUrl(p)">正面</a>
                                <a v-bind:href="idBackUrl(p)">背面</a>
                            </span>
                        </div>
                     
                    </td>
                    <td>
                        <ul style="list-style: none">
                            <li v-for="item in p.package_items">
                                <span>{{ item.brand + ' ' + item.name + '（' + item.specification + '）'}}</span>
                                <span style="font-weight: 500">{{ item.quantity }}</span>
                            </li>
                        </ul>
                    </td>  
                    <td>
                        <div class="field has-addons">
                          <p class="control" style="display:inline-block">
                            <span class="select">
                              <select v-model="p.status">
                                <option value="pending">等待收取</option>
                                <option value="received">已收到</option>
                                <option value="shipped">已寄出</option>
                              </select>
                            </span>
                          </p>
                          <p class="control" style="display:inline-block">
                            <a class="button is-primary" v-on:click="updateStatus(p)" v-bind:class="{ 'is-loading': updatingPackage === p.id }">
                              保存更改
                            </a>
                          </p>
                        </div>
                    </td>
                </tr>    
            </tbody>
         </table>
  </article>
  </div>
</div>
    `,

    computed: {
        packages () {
            if (this.inSearch)
                return this.results
            else
                return this.$store.getters.allPackages
        },

        updatingPackage () {
            return this.$store.getters.updatingPackage
        }
    },

    data() {
        return {
            q: '',
            inSearch: false,
            results: [],

            sortID: 'desc',
            sortTime: 'desc'
        }
    },

    watch: {
        q: function(val) {
            if (val !== undefined && val !== null && val.length > 3) {
                this.inSearch = true
                this.results = this.search(val)
            } else {
                this.inSearch = false
                this.results = []
            }
        }
    },

    methods: {
        toggleSortID () {
            this.sortID = (this.sortID === 'desc') ? 'asc' : 'desc'
            this.packages.sort((a, b) => {
                return this.sortID === 'asc' ?
                    a.serial.substr(2) < b.serial.substr(2) : a.serial.substr(2) > b.serial.substr(2)
            })
        },

        toggleSortTime() {
            this.sortTime = (this.sortTime === 'desc') ? 'asc' : 'desc'
            this.packages.sort((a, b) => {
                return this.sortTime === 'asc' ?
                    a.created_at < b.created_at : a.created_at > b.created_at
            })
        },

        idFrontUrl(p) {
            return p.address.id_front
        },

        idBackUrl(p) {
            return p.address.id_back
        },

        updateStatus(p) {
            this.$store.dispatch('updatePackage', p)
        },

        comparator(p1, p2) {
            
        },

        search(qs) {
            const pkgs = this.$store.getters.allPackages
            var results = []
            pkgs.forEach((pkg) => {
                const mesh = pkg.serial + pkg.address.name + pkg.address.mobile + pkg.address.id_number

                if (mesh.toLowerCase().indexOf(qs.toLowerCase()) >= 0) {
                    results.push(pkg)
                }
            })

            return results
        }

    },

    created() {
        this.$store.dispatch('getAllPackages')
    }

}
