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
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="newProduct.category">
                                    <option value="cosmetics" label="化妆品"></option>
                                    <option value="health products" label="营养品"></option>
                                    <option value="clothes" label="服饰"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">产品描述</label></div>
                        <div class="control"><textarea class="textarea" placeholder="添加商品的描述信息" v-model="newProduct.detail"></textarea></div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label">产品照片</label></div>
                        <div class="control">
                            <input type="file" @change="handleUpload"> {{ 9 - count}}</input>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"></div>
                        <div class="control">
                             <div class="columns is-multiline">
                                <div class="column">
                                    <figure class="image is-128x128" style="border: 1px dotted #DDD">
                                        <img v-bind:src="src1 || placeholder">
                                    </figure>
                                </div>
                                <div class="column" v-if="src2 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src2">
                                    </figure>
                                </div>
                                <div class="column" v-if="src3 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src3">
                                    </figure>
                                </div>
                                <div class="column" v-if="src4 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src4">
                                    </figure>
                                </div>
                                <div class="column" v-if="src5 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src5">
                                    </figure>
                                </div>
                                <div class="column" v-if="src6 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src6">
                                    </figure>
                                </div>
                                <div class="column" v-if="src7 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src7">
                                    </figure>
                                </div>
                                <div class="column" v-if="src8 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src8">
                                    </figure>
                                </div>
                                <div class="column" v-if="src9 !== null">
                                    <figure class="image is-128x128">
                                        <img v-bind:src="src9">
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="control is-horizontal">
                        <div class="control-label"><label class="label"></label></div>
                        <div class="control"><button class="button is-primary" @click="addProduct" v-bind:disabled="!submitable">添加</button><button class="button is-link">取消</button></div>
                    </div>
                </div>
            </article>          
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">产品列表</h4>
                <table class="table">
                    <thead><tr><th>名称</th><th>价格</th><th>重量</th><th>删除</th></tr></thead>
                    <tbody>
                        <tr v-for="p in products">
                            <td>{{ p.name }}</td>
                            <td>{{ p.price }}</td>
                            <td>{{ p.weight }}</td>
                            <td class="is-icon">
                                <a v-on:click="deleteProduct(p)"><i class="fa fa-trash"></i></a>
                            </td>
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
        },

        submitable() {

            var submitable = true
            Object.getOwnPropertyNames(this.newProduct).forEach((p) => {
                if (this.newProduct[p].length === 0) {
                    submitable = false
                }
            })
            return submitable && this.count >= 1
        }
    },

    methods: {
        packProduct (product) {
            if (product['category']) {
                product['category'] = product['category'].toLowerCase()
            }
            const form = new FormData()
            Object.getOwnPropertyNames(product).forEach(function (k) {
                form.append(k, product[k])
            })
            // attach images

            Object.getOwnPropertyNames(this.uploads).forEach((k) => {
                form.append(k, this.uploads[k])
            })

            return form
        },

        addProduct () {
            this.$store.dispatch('addNewProduct', {product: this.packProduct(this.newProduct)})
            this.uploads = {}
            this.count = 0
            this.newProduct = {}
            for (var i = 1; i <= 9; i++) {
                this["src" + i] = null
            }
        },

        deleteProduct (product) {
            this.$store.dispatch('deleteProduct', {product: product})
        },

        handleUpload(e) {
            const files = e.target.files;
            this.count++
            this.uploads["image" + this.count] = files[0]

            const reader = new FileReader();

            reader.addEventListener('load', () => {
                this["src" + this.count] = reader.result;
            });
            reader.readAsDataURL(files[0]);
        }
    },

    data() {
        return {
            newProduct: {
                name: '',
                price: '',
                weight: '',
                detail: '',
                category: ''
            },
            // number of images uploaded so far
            count: 0,
            uploads: {},
            placeholder: "http://bulma.io/images/placeholders/128x128.png",
            src1: null,
            src2: null,
            src3: null,
            src4: null,
            src5: null,
            src6: null,
            src7: null,
            src8: null,
            src9: null
        }
    },

    created () {
        this.$store.dispatch('getAllProducts')
    }
}