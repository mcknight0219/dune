<template>
    <card-modal :visible="visible" @ok="close" @cancel="close" @close="close" :title="title">
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">商品详情</p>
                    </div>
    
                </div>
            </nav>
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-64x64"><img v-bind:src="product.image1"></figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">
                                {{ product.name }}
                                <span class="tag is-light">{{ getProductCategoryName(product.product_category_id)}}</span>
                            </p>
                            <p class="subtitle is-6">
                                <span>{{ product.brand }}</span>
                                <br/>
                                {{ makePriceLabel(product) }}
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        {{ product.detail }}
                    </div>
                </div>
            </div>
        </div>
    </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
    components: {
        CardModal
    },

    props: {
        product: {
            type: Object,
            default: () => ({

            })
        },
        visible: {
            type: Boolean,
            default: false
        },
        title: String
    },

    methods: {
        close() {
            this.$emit('close')
        },

        makePriceLabel(prices) {
          let label = ''
          if (!prices) 
            return label
          for (let i = '1'; i <= '6'; ++i) {
            if (prices['price'+i] > 0) {
              label = label + '$' + prices['price'+i] + ' (' + i + ') '
            }
          }
          return label
        },

        getProductCategoryName(id) {
            const categories = this.$store.getters.allProductCategories
            for (let i = 0; i < categories.length; ++i) {
                if (categories[i].id === id) { return categories[i].name }
            }
        }
    }
}
</script>
