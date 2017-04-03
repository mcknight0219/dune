export default {
    name: 'Package',

    template: `
<div>
  <div class="panel-title">
    <strong>寄件管理</strong>
  </div>
  <div class="tile is-ancestor"> 
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h4 class="title">寄件类别管理</h4>
          <p class="control has-addons">
            <input type="text" placeholder="类别名称" class="input" v-model="newItemCategoryName">
            <a class="button is-success" @click="addItemCategory">添加</a>
          </p>
          <table class="table">
            <thead><tr><th>ID</th><th>名称</th><th></th></tr></thead>
            <tbody>
              <tr v-for="ic in itemCategories">
                <td>{{ ic.id }}</td>
                <td>{{ ic.name }}</td>
                <td class="is-icon">
                  <a @click="deleteItemCategory(ic.id)"><i class="fa fa-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
  </div>
  
  <article class="tile is-parent">
    <article class="tile is-child box">
        <nav class="level">
            <div class="level-left"><h4 class="title">邮寄列表</h4></div> 
            <div class="level-right"><input type="text" class="input" placeholder="订单号码，名字等" v-model="q"></div> 
        </nav>
        
        <table class="table">
            <thead><tr><th>订单号</th><th>时间</th><th>邮寄地址</th><th>证件图片</th><th>包裹详情</th><th>收到</th><th>寄出</th></tr></thead>
            <tbody>
                <tr v-for="p in packages">
                    <td style="font-weight: 500">{{ p.serial  }}</td>
                    <td>{{ new Date(p.created_at).toLocaleString() }}</td>
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
                        <input type="checkbox" v-model="p.is_received" v-on:click="updatePackage(p)">
                        
                    </td>
                    <td style="vertical-align: middle">
                        <input type="checkbox" v-model="p.is_shipped" v-on:click="updatePackage(p)">
                        
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
            return this.$store.getters.allPackages
        },

        itemCategories () {
            return this.$store.getters.allItemCategories
        }
    },

    data() {
        return {
            q: '',
            newItemCategoryName: ''
        }
    },

    watch: {
        q: function(val) {
        }
    },

    methods: {
        idFrontUrl(p) {
            return p.address.id_front
        },

        idBackUrl(p) {
            return p.address.id_back
        },

        addItemCategory() {
            this.$store.dispatch('addItemCategory', { category: {name: this.newItemCategoryName} })
        },

        deleteItemCategory(id) {
            this.$store.dispatch('deleteItemCategory', id) 
        },

        updatePackage(p) {
            this.$store.dispatch('updatePackage', p)
        },

        /**
         * Package sorting:
         *    
         *  1. if package is sent, put it at bottom cause it's of lowerest priority.
         *  2. if package is received within last three days but not sent put it on top 
         *     because it needs action.
         *  3. package is placed according to timestamp by default
         */ 
        comparator(p1, p2) {
            
        },

        searchPackages(qs) {
            
        }

    },

    created() {
        this.$store.dispatch('getAllPackages')
        this.$store.dispatch('getAllItemCategories')
    }
}
