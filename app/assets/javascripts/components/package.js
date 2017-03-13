export default {
    name: 'Package',

    template: `
        <div>
            <div class="panel-title">
                <strong>Packages</strong>
            </div>
            <article class="tile is-child box">
                <h4 class="title">邮寄列表</h4>
                <table class="table">
                    <thead><tr><th>物品详情</th><th>目的地</th><th>上门取件</th><th>动作</th></tr></thead>
                    <tbody>
                        <tr v-for="p in packages">
                            
                        </tr>    
                    </tbody>
                </table>
            </article>
        </div>
    `,

    computed: {
        packages () {
            this.$store.getters.allPackages
        }
    },

    created() {

    }
}