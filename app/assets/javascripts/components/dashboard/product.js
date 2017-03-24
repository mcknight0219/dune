import Gallery from 'components/gallery'

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
                        <p class="control"><input class="input" type="text" placeholder="商品名称" v-model="newProduct.name"></p>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">参数</label></div>
                        <div class="control is-grouped">
                            <p class="control is-expanded"><input class="input" type="number" placeholder="价格" v-model="newProduct.price"></p>
                            <p class="control is-expanded"><input class="input" type="number" placeholder="重量" v-model="newProduct.weight"></p>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">类别</label></div>
                        <div class="control"><div class="select is-fullwidth"><select v-model="newProduct.category"><option>Cosmetics</option><option>Health Products</option></select></div></div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">产品描述</label></div>
                        <div class="control"><textarea class="textarea" placeholder="添加商品的描述信息" v-model="newProduct.detail"></textarea></div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">产品照片</label></div>
                        <div class="control">
                            <gallery></gallery>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label"></label></div>
                        <div class="control"><button class="button is-primary" @click="addProduct" v-bind:disabled="submitable">添加</button><button class="button is-link">取消</button></div>
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
                            <td class="is-icon">
                                <a v-on:click="openModal(p)"><i class="fa fa-pencil"></i></a>
                                <a v-on:click="deleteProduct(p)"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </article>
        </div>
        <div class="modal animated" v-bind:class="{ 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">编辑产品详情</header>
                <section class="modal-card-body">
                    <div class="block">
                        <div class="control is-horizontal">
                            <div class="control-label"><label class="label">名称</label></div>
                            <p class="control"><input class="input" type="text" :placeholder="editingProduct.name" v-model="newProduct.name"></p>
                        </div>
                        <div class="control is-horizontal">
                            <div class="control-label"><label class="label">价格</label></div>
                            <p class="control is-expanded"><input class="input" type="number" :placeholder="editingProduct.price" v-model="newProduct.price"></p>
                        </div>
                        <div class="control is-horizontal">
                            <div class="control-label"><label class="label">重量</label></div>
                            <p class="control is-expanded"><input class="input" type="number" :placeholder="editingProduct.weight" v-model="newProduct.weight"></p>
                        </div>
                        <div class="control is-horizontal">
                            <div class="control-label"><label class="label">类别</label></div>
                            <div class="control"><div class="select is-fullwidth"><select v-model="newProduct.category" :placeholder="editingProduct.category"><option>Cosmetics</option><option>Health Products</option></select></div></div>
                        </div>
                        <div class="control is-horizontal">
                            <div class="control-label"><label class="label">产品描述</label></div>
                            <div class="control"><textarea class="textarea" :placeholder="editingProduct.detail" v-model="newProduct.detail"></textarea></div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <a class="button is-primary">Ok</a>
                    <a class="button" v-on:click="hideModal">Cancel</a>
                </footer>
            </div>
        </div>
    </div>
    `,

    computed: {
        products() {
            return this.$store.getters.allProducts
        },

        submitable() {
            return this.newProduct.length > 0
        }
    },

    components: {
        'gallery': Gallery
    },

    methods: {
        filterProduct (product) {
            if (product['category']) {
                product['category'] = product['category'].toLowerCase()
            }
            return product
        },

        addProduct () {
            this.$store.dispatch('addNewProduct', {product: this.filterProduct(this.newProduct)})
        },

        deleteProduct (product) {
            this.$store.dispatch('deleteProduct', {product: product})
        },

        openModal (product) {
            this.showModal = true
            this.editingProduct = product
        },

        hideModal () {
            this.showModal = false
            this.editingProduct = {}
        }
    },

    data() {
        return {
            newProduct: {},
            showModal: false,
            editingProduct: {}
        }
    },

    created () {
        this.$store.dispatch('getAllProducts')
    }
}