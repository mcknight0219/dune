<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent is-6">
                <article class="tile is-child box">
                    <nav class="level">
                        <div class="level-left">
                            <strong>产品列表</strong>
                        </div>
                    </nav>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>商品</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in products">
                                <td style="max-width: 10em; overflow: auto;">
                                    <a @click="openModal(p)" class="button is-link" >{{ p.name }}</a>
                                <td>{{ p.active ? "在售" : "下架"}}</td>
                                <td class="is-icon">
                                    <a v-on:click="deleteProduct(p)">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
           
            <div class="tile is-parent is-vertical">
                <article class="tile is-child box">
                    <nav class="level">
                        <div class="level-left">
                            <strong>添加新产品</strong>
                        </div>
                    </nav>
    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">商品</label>
                        </div>
                        <div class="field-body">
                            <div class="field is-grouped">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="商品名称" v-model="newProduct.name">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input" type="text" placeholder="品牌" v-model="newProduct.brand">
                                </p>
                            </div>
                            <div class="field is-narrow">
                                <p class="control is-expanded">
                                    <div class="select is-fullwidth">
                                        <select v-model="newProduct.product_category_id">
                                            <option v-for="category in productCategories" v-bind:value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <div class="field is-horizontal">
                      <div class="field-label is-normal"><label class="label">价格(包含运费)</label></div>
                      <div class="field-body">
                        <div class="field has-addons">
                          <p class="control">
                              <span class="select">
                                  <select v-model="quantityToAdd">
                                      <option v-for="n in 6">
                                          {{ n }}
                                      </option>
                                  </select>
                              </span>
                          </p>
                          <p class="control">
                              <input type="number" placeholder="e.g. 123.45" class="input" v-model="priceToAdd" min="0">
                          </p>
                          <p class="control">
                              <a class="button is-primary" @click="addNewPrice" v-bind:disabled="priceToAdd == null">添加</a>
                          </p>
                        </div>
                      </div>
                    </div>  

                    <div class="field is-horizontal" v-if="!isAddedPriceEmpty">
                      <div class="field-label is-normal"></div>
                      <div class="field-body">
                        <table class="table is-striped">
                          <thead>
                            <th>数量</th>
                            <th>总价</th>
                            <th></th>
                          </thead>
                          <tbody>
                            <tr v-for="i in Object.keys(newProduct.price)">
                              <td>{{ i }}</td>
                              <td>${{ newProduct.price[i] }}</td>
                              <td class="is-icon is-small">
                                <a @click="removePriceForQuantity(i)">
                                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label for="" class="label">产品描述</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <textarea class="textarea" placeholder="添加商品的描述信息" v-model="newProduct.detail"></textarea>
                                </div>
                            </div>
    
                        </div>
                    </div>
    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">产品照片</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input" type="file" @change="handleUpload"> {{ 9 - count}}</input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label"></div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="columns is-multiline">
                                        <div class="column">
                                            <figure class="image is-square" style="border: 1px dotted #DDD">
                                                <img v-bind:src="src1 || placeholder">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src2 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src2">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src3 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src3">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src4 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src4">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src5 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src5">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src6 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src6">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src7 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src7">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src8 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src8">
                                            </figure>
                                        </div>
                                        <div class="column" v-if="src9 !== null">
                                            <figure class="image is-64x64">
                                                <img v-bind:src="src9">
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label">
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary" @click="addProduct" v-bind:disabled="!submitable">添加</button>
                                    <button class="button is-link">取消</button>
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                </article>

                <article class="tile is-child box">
                    <nav class="level">
                        <div class="level-left">
                            <strong>商品类别管理</strong>
                        </div>
                    </nav>
                    <div class="field has-addons has-addons-right">
                        <p class="control">
                            <span class="select">
                                <select v-model="newProductCategory.parentId">
                                    <option v-for="option in options" v-bind:value="option.id">
                                        {{ option.name }}
                                    </option>
    
                                </select>
                            </span>
                        </p>
                        <p class="control">
                            <input type="text" placeholder="类别名称" class="input" v-model="newProductCategory.name">
                        </p>
                        <p class="control">
                            <a class="button is-primary" @click="addProductCategory">添加</a>
                        </p>
    
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>父类别</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pc in productCategories">
                                <td>{{ pc.name }}</td>
                                <td>{{ pc.parent_id }}</td>
                                <td class="is-icon">
                                    <a @click="deleteProductCategory(pc.id)">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                    <p v-if="deleteFailed(pc.id)" class="help is-danger">无法删除，正在使用</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
        </div>
        <ProductModalComponent :visible="showModal" @close="closeModal" :product="productInModal"></ProductModalComponent>
    </div>
</template>

<script>
import Vue from 'vue'
import ProductModal from './modals/ProductModal'

const ProductModalComponent = Vue.extend(ProductModal)

export default {
    name: 'ManageProduct',

    components: {
        ProductModalComponent
    },

    computed: {
        products() {
            return this.$store.getters.allProducts
        },

        isAddedPriceEmpty() {
          for (let i = '1'; i <= '6'; i++) {
            if (this.newProduct.price.hasOwnProperty(i)) {
              return false
            }
          }
          return true
        },

        productCategories() {
            return this.$store.getters.allProductCategories
        },

        // root category
        options() {
            return this.productCategories.filter((pc) => {
                return pc.parent_id === null
            }).map((pc) => {
                return {
                    name: pc.name,
                    id: pc.id
                }
            }).concat([{ name: '无', id: -1 }])
        },

        submitable() {
            var submitable = true
            Object.getOwnPropertyNames(this.newProduct).forEach((p) => {
                if (p !== '__ob__' && (!this.newProduct[p] || this.newProduct[p].length === 0)) {
                    submitable = false
                }
            })

            for (let i = '1'; i <= '6'; ++i) {
              if (!this.newProduct.price.hasOwnProperty(i)) {
                submitable = false
                break
              }
            }
            return submitable && this.count >= 1
        }
    },

    methods: {
        normalizeProduct(product) {
            if (product['category']) {
                product['category'] = product['category'].toLowerCase()
            }
            const form = new FormData()
            let prices = product.price
            delete product.price
            Object.getOwnPropertyNames(product).forEach(function (k) {
                form.append(k, product[k])
            })
            for (let i = '1'; i <= '6'; ++i) {
              form.append('price' + i, prices[i])
            }

            // attach images
            Object.getOwnPropertyNames(this.uploads).forEach((k) => {
                form.append(k, this.uploads[k])
            })

            return form
        },

        addNewPrice() {
          if (!this.priceToAdd || !this.quantityToAdd || this.quantityToAdd > 6) {
            return
          }
          Vue.set(this.newProduct.price, this.quantityToAdd + '', this.priceToAdd)
          if (this.quantityToAdd < 6) {
            this.quantityToAdd++
          } else {
            this.quantityToAdd = 1
          }
          this.priceToAdd = null
        },

        removePriceForQuantity(n) {
          Vue.delete(this.newProduct.price, n)
        },

        addProduct() {
            this.$store.dispatch('addNewProduct', { product: this.normalizeProduct(this.newProduct) })
            // reset form
            this.uploads = {}
            this.count = 0
            this.newProduct = {
                name: '',
                brand: '',
                price: {},
                detail: '',
                product_category_id: ''
            }
            this.quantityToAdd = 1
            this.priceToAdd = null
            for (var i = 1; i <= 9; i++) {
                this["src" + i] = null
            }
        },

        addProductCategory() {
            this.$store.dispatch('addProductCategory', { category: this.newProductCategory })
            this.newProductCategory.name = ''
            this.newProductCategory.parentId = null
        },

        deleteProductCategory(id) {
            if (this.productCategories.filter(pc => pc.parent_id === id).length > 0) {
                this.failedDeletedCategories.push(id)
                return
            }

            this.$store.dispatch('deleteProductCategory', id)
        },

        deleteFailed(id) {
            return this.failedDeletedCategories.indexOf(id) >= 0
        },

        deleteProduct(product) {
            this.$store.dispatch('deleteProduct', { product: product })
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
        },

        openModal(product) {
            this.productInModal = product
            this.showModal = true
        },

        closeModal() {
            this.showModal = false
        }
    },

    data() {
        return {
            showModal: false,
            productInModal: {},
            quantityToAdd: 1,
            priceToAdd: null,
            newProduct: {
                name: '',
                brand: '',
                price: {},
                detail: '',
                product_category_id: ''
            },
            newProductCategory: {
                name: '',
                parentId: -1
            },
            failedDeletedCategories: [],
            // number of images uploaded so far
            count: 0,
            uploads: {},
            placeholder: "http://bulma.io/images/placeholders/64x64.png",
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

    created() {
        this.$store.dispatch('getAllProducts')
        this.$store.dispatch('getAllProductCategories')
    }
}
</script>