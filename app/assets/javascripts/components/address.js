export default {
    name: 'Address',

    template: `
    <div class="one_third">
        <div class="a-box" v-bind:class="{ selected: selected }" v-on:click="emitSelected()">
            <div class="a-box-inner a-small-padding">
                <ul>
                    <li><h5>{{ address.name }}</h5></li>
                    <li><span>{{ address.address_line1 }}</span></li>
                    <li><span>{{ cityState }}</span></li>
                    <li><span>{{ address.country }}</span></li>
                    <li><span>Phone number: {{ address.mobile }}</span></li>
                </ul>
                <div class="a-row">
                    <span class="a-button"><a v-bind:href="editPath">编辑</a></span>
                    <span class="a-button a-button-last" v-on:click="emitDelete()">删除</span>
                </div>
            </div>
        </div>
    </div>
    `,

    props: ['address', 'selected'],

    computed: {
        cityState() {
            return this.address.city + ', ' + this.address.state + ' ' + this.address.post_code
        },

        editPath() {
            return "/addresses/" + this.address.id + "/edit?returnUrl=/packages"
        }
    },

    methods: {
        emitDelete() {
            this.$emit('delete')
        },

        emitSelected() {
            this.$emit('selected')
        }
    }
}