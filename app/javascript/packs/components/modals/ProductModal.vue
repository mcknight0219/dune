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
                            <figure class="image is-48x48"><img v-bind:src="product.src1"></figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{ product.name }}</p>
                        </div>
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
        }
    }
}
</script>
