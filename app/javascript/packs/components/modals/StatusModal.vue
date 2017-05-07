<template>
    <card-modal :visible="visible" @ok="ok" @cancel="close" @close="close" :title="title">
        <div class="content has-text-centered">
            <div class="status-group">
                <div class="is-pending">
                    <input type="radio" id="pending" value="pending" v-model="status">
                    <label for="pending"><span class="icon is-large"><i class="fa fa-circle" aria-hidden="true"></i></span><br/>等待</label>
                </div>
                <div class="is-received">
                    <input type="radio" id="received" value="received" v-model="status">
                    <label for="received"><span class="icon is-large"><i class="fa fa-circle" aria-hidden="true"></i></span><br/>收到</label>
                </div>
    
                <div class="is-shipped">
                    <input type="radio" id="shipped" value="shipped" v-model="status">
                    <label for="shipped"><span class="icon is-large"><i class="fa fa-circle" aria-hidden="true"></i></span><br/>寄出</label>
                </div>
            </div>
        </div>
    </card-modal>
</template>

<style lang="scss">
.status-group {
    display: flex;
    justify-content: space-around;

    .is-pending {
        color: crimson;
    }
    .is-received {
        color: cadetblue;
    }
    .is-shipped {
        color: aquamarine;
    }
}

input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;

    &:active~label {
        opacity: 1;
    }

    &:checked~label {
        opacity: 1;
        border: 1px solid #ccc;
    }
}

label {
    flex: 1;
    box-sizing: border-box;
    display: block;
    height: 80px;
    width: 95px;
    padding: 5px 5px;
    cursor: pointer;
    transition: all .3s ease-in-out;
}
</style>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
    components: {
        CardModal
    },

    data () {
        return {
            status: '' 
        }
    },

    watch: {
        visible: function (val) {
            if (val) {
                this.status = this.package.status
            }
        }
    },

    props: {
        package: Object,
        visible: Boolean,
        title: String
    },

    methods: {
        close() {
            this.$emit('close')
        },

        ok () {
            this.$emit('ok', this.status)
        }
    }
}

</script>