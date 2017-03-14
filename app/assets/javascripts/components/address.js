export default {
    name: 'Address',

    template: `
    <div class="one_third chose">
        <div v-bind:class="{ selected: selected }" >
          <h3 class="receivername">{{ address.name }}</h3>  
          <p>{{ address.address_line1 }}</p>
          <p>{{ address.cityState + ' ' + address.country }}</p>
          <p>电话 {{ address.mobile }}
          <a class="btn smlbtn" v-on:click="emitSelected()">选此收件人</a>
          <ul class="nospace inline pishright">
            <li><a class="btn smlbtn inverse" v-bind:href="editPath">编辑</a></li>  
            <li><a class="btn smlbtn inverse" v-on:click="emitDelete()">删除</a></li>  
          </ul>
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
