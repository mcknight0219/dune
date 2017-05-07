<template>
    <modal :visible="visible" @close="close">
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <input class="input" type="url" v-model="uploadLocation" disabled=true>   
                    <p>
                    请将此地址告知用户，以便用户可以随时上传他的身份证信息
                    </p>
                </div>
            </article>
        </div>
    </modal>
</template>

<script>
import {Modal} from 'vue-bulma-modal'

export default {
    components: {
        Modal
    },

    computed: {
        uploadLocation () {
            const href = window.location.href
            const root = href.substring(0, href.indexOf(window.location.pathname))
            return root + "/photos/" + this.package.id
        }
    },

    props: {
        package: {
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
        }
    }
}
</script>  