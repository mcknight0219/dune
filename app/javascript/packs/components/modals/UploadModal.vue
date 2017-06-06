<template>
    <modal :visible="visible" @close="close">
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input id="url" class="input" type="url" v-model="uploadLocation" readonly=true>   
                        </p>
                        <p class="control">
                            <a data-clipboard-target="#url" class="button is-icon"><i class="fa fa-clipboard" aria-hidden="true"></i></a>
                        </p>
                    </div>
                    <div v-if="successful" class="notification is-primary">
                        地址已拷贝到您的剪贴板
                    </div>

                    <p>请将此地址告知用户，以便用户可以随时上传他的身份证信息</p>
                </div>
            </article>
        </div>
    </modal>
</template>

<script>
import {Modal} from 'vue-bulma-modal'
import Clipboard from 'clipboard'

export default {
    components: {
        Modal,
    },

    computed: {
        uploadLocation () {
            const href = window.location.href
            const root = href.substring(0, href.indexOf(window.location.pathname))
            const ctx = this.isPackage(this.orderOrPackage) ? 'package' : 'order'
            return root + "/photos/" + ctx + '/' + this.orderOrPackage.id
        }
    },

    data () {
        return {
            clipboard: null,
            successful: false
        }
    },

    props: {
        orderOrPackage: {
            type: Object,
            required: true
        },
        visible: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        close () {
            this.$emit('close')
        },

        isPackage(x) {
            return x.serial !== undefined
        }
    },

    created () {
        this.clipboard = new Clipboard('.button.is-icon')
        this.clipboard.on('success', () => {
            this.successful = true
        })
    }
}
</script>  