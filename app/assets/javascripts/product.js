export default {
    name: 'Product',

    template: `
    <div>
        <div class="panel-title">
            <strong>Products</strong>
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h1 class="title">添加新产品</h1>
                <div class="block">
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">名称</label></div>
                        <p class="control"><input class="input" type="text" placeholder="商品名称"></p>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">参数</label></div>
                        <div class="control is-grouped">
                            <p class="control is-expanded"><input class="input" type="number" placeholder="价格"></p>
                            <p class="control is-expanded"><input class="input" type="number" placeholder="重量"></p>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">类别</label></div>
                        <div class="control"><div class="select is-fullwidth"><select><option>Cosmetics</option><option>Health Product</option></select></div></div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">产品描述</label></div>
                        <div class="control"><textarea class="textarea" placeholder="添加商品的描述信息,支持markdown"></textarea></div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label"></label></div>
                        <div class="control"><button class="button is-primary" @click="addProduct">确定</button><button class="button is-link">取消</button></div>
                    </div>
                </div>
            </article>          
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">产品列表</h4>
                <table class="table">
                    <thead><tr><th>Name</th><th>Price</th><th>Weight</th><th>Action</th></tr></thead>
                    <tbody>
                        <tr v-for="p in products">
                            <td>{{ p.name }}</td>
                            <td>{{ p.price }}</td>
                            <td>{{ p.weight }}</td>
                        </tr>    
                    </tbody>
                </table>
            </article>
        </div>
    </div>
    `,

    computed: {
        products() {
            return this.$store.getters.allProducts
        }
    },

    methods: {
        addProduct () {
            alert('Add a product')
        }
    },

    created () {
        this.$store.dispatch('getAllProducts')
    }
}