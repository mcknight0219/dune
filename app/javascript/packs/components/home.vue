<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">寄件</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Line'" :data="packageData" :options="lineOptions"></chartist>
                    </div>
    
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">用户</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Pie'" :data="userData" :options="pieOptions"></chartist>
                    </div>
                </article>
            </div>
        </div>
         <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">商品销售</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Line'" :data="packageData" :options="options"></chartist>
                    </div>
    
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">商品分布</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Line'" :data="packageData" :options="options"></chartist>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import Chartist from 'vue-bulma-chartist'

// Get last N days starting from and including today
function lastNDays(n) {
    [...Array(n).keys].map((i) => {
        var d = new Date()
        d.setDate(d.getDate() - i)
        return d
    }).reverse()
}

export default {
    components: {
        Chartist
    },

    computed: {
        packageData () {
            const packages = this.$store.getters.allPackages
            
        }
    },

    data() {
        return {
            packageData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [12, 9, 7, 8, 5],
                    [2, 1, 3.5, 7, 3]
                ]
            },

            lineOptions: {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            },

            userData: {
                series: [5, 3, 2]
            },

            pieOptions: {
                charPadding: 30,
                labelOffset: 60,
                labelDirection: 'explode',
                labelInterpolationFnc (value) {
                    return value
                }
            }
        }
    },

    created () {
        this.$store.dispatch('getAllPackages')
    }
}

</script>