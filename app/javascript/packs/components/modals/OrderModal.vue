<template>
    <card-modal :visible="visible" @ok="close" @cancel="close" @close="close" :title="title">
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">订单#{{order.id}}</p>
                    </div>
                </div>
            </nav>
    
            <div class="table-responsive">
                <table class="table is-bordered is-stripped is-narrow">
                    <thead>
                        <tr>
                            <th>产品ID</th>
                            <th>名称</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="oi in order.items">
                            <td>{{ oi.id }}</td>
                            <td>{{ oi.name + "(" + oi.brand + ")"}}</td>
                            <td>${{ oi.price }}</td>
                        </tr>
                        <tr>
                            <th colspan="2">邮费</th>
                            <td>${{ order.shipping_price}}</td>    
                        </tr>
                        <tr>
                            <th colspan="2">总价</th>
                            <td>${{order.total_price / 100 }}</td>
                        </tr>
                    </tbody>
    
                </table>
            </div>
    
            <nav class="level">
                <div class="level-left">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="subtitle is-5">寄送地址</p>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <span class="tag is-danger" v-if="!hasIdInfo(order.address)">无身份证信息</span>
                    </div>
                </div>
            </nav>
            <div class="card" style="background-color:lightyellow;">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img v-bind:src="mediaSrc(order.address.id_front)" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{ order.address.name }}</p>
                            <p class="subtitle is-6">
                                <span class="icon">
                                    <i class="fa fa-mobile" aria-hidden="true"></i>
                                </span>
                                {{ order.address.mobile }}
                                <br/>
                                <span class="icon">
                                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                </span>
                                {{ order.address.id_number }}
                            </p>
    
                        </div>
                    </div>
    
                    <div class="content">
                        <div>{{ order.address.address_line1 }}</div>
                        <div>{{ order.address.city }} {{ order.address.state }}</div>
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
        order: {
            type: Object,
            default: function () {
              return { address: {} }
            }
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

        hasIdInfo(addr) {
            return addr !== undefined && addr.id_number !== undefined && addr.id_number !== null && addr.id_number.length > 0 && addr.id_front.indexOf("missing") < 0 && addr.id_back.indexOf("missing") < 0
        },

        mediaSrc(src) {
            if (src && src.indexOf("missing") > 0) {
                return "http://bulma.io/images/placeholders/96x96.png"
            }
            return src
        }
    }
}
</script>
