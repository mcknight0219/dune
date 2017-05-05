<template>
    <card-modal :visible="visible" @close="close" :title="title" transition="zoom">
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="subtitle is-5">包裹内容</p>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <span class="tag is-dark">普货</span>
                    </div>
                </div>
            </nav>
    
            <table class="table is-striped is-narrow">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>品牌</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="it in package.package_items">
                        <td>{{ it.name }}</td>
                        <td>{{ it.brand }}</td>
                        <td>{{ it.quantity }}</td>
                    </tr>
                </tbody>
            </table>
    
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
                                <span class="tag is-danger">无身份证信息</span>
                            </div>
                        </div>
                    </nav>
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img v-bind:src="package.address.id_front" alt="Image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">{{ package.address.name }}</p>
                                    <p class="subtitle is-6">
                                        <span class="icon">
                                            <i class="fa fa-mobile" aria-hidden="true"></i>
                                        </span>
                                        {{ package.address.mobile }}
                                         <br/><span class="icon">
                                            <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                        </span>
                                        {{ package.address.id_number }}
                                    </p>
                                    
                                </div>
                            </div>
    
                            <div class="content">
                                <div>{{ package.address.address_line1 }}</div>
                                <div>{{ package.address.city }} {{ package.address.state }}</div>
                                <br>
                                <small>寄件人电话 {{ package.profile.mobile}}</small>
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
        package: Object,
        visible: Boolean,
        title: String
    },

    data() {
        return {

        }
    },

    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>