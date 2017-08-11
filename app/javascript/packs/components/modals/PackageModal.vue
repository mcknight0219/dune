<template>
    <card-modal :visible="visible" @ok="close" @cancel="close" @close="close" :title="title">
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
                        <span class="tag is-dark">{{ package.serial.substring(0, 2) === "AC" ? "普货" :"轻奢" }}</span>
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
                        <span class="tag is-danger" v-if="!hasIdInfo(package.address)">无身份证信息</span>
                    </div>
                </div>
            </nav>
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img v-bind:src="mediaSrc(package.address.id_front)" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{ package.address.name }}</p>
                            <p class="subtitle is-6">
                                <span class="icon">
                                    <i class="fa fa-mobile" aria-hidden="true"></i>
                                </span>
                                {{ package.address.mobile }}
                                <br/>
                                <span class="icon">
                                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                                </span>
                                {{ package.address.id_number }}
                            </p>
    
                        </div>
                    </div>
    
                    <div class="content">
                        <div>{{ package.address.address_line1 }}</div>
                        <div>{{ package.address.city }} {{ package.address.state }} {{ package.address.district }}</div>
                        <br>
                        <small>寄件人 {{ package.profile.name}}(
                            <strong>{{ package.profile.mobile}}</strong>)</small>
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
        package: {
            type: Object,
            default: () => ({ serial: "" })
        },
        visible: {
            type: Boolean,
            default: false
        },
        title: String
    },

    data() {
        return {

        }
    },

    methods: {
        close() {
            this.$emit('close')
        },

        hasIdInfo(addr) {
            return addr.id_number !== undefined && addr.id_number !== null && addr.id_number.length > 0 && addr.id_front.indexOf("missing") < 0 && addr.id_back.indexOf("missing") < 0
        },

        mediaSrc(src) {
            if (src.indexOf("missing") > 0) {
                return "http://bulma.io/images/placeholders/96x96.png"
            }
            return src
        }
    }
}
</script>