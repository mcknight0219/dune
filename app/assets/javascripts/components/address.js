export default {
    name: 'Address',

    template: `
    <div class="one_third chose" v-bind:class="{ chosen: selected, first: firstOne }">
          <h3 class="receivername">{{ address.name }}</h3>  
          <p>{{ address.address_line1 }}</p>
          <p>{{ cityState + ' ' + address.country }}</p>
          <p>电话 {{ address.mobile }}</p>
          <a class="btn widebtn" v-on:click="emitSelected()">选此收件人</a>
          <ul class="inline">
            <li><a class="btn smlbtn inverse" v-bind:href="editPath">编辑</a></li>  
            <li><a class="btn smlbtn inverse" v-on:click="emitDelete()">删除</a></li>  
          </ul>
    </div>
    `,

    props: ['address', 'selected', 'pos'],

    computed: {
        cityState() {
            return this.address.city + ', ' + this.address.state + ' ' + this.address.post_code
        },

        editPath() {
            return "/addresses/" + this.address.id + "/edit?returnUrl=/packages"
        },

        firstOne() {
            return (this.pos % 3) === 0
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
