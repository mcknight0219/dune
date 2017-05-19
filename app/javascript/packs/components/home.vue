<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent is-4">
                <article class="tile is-child box">
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item">
                                <h4 class="title is-4">寄件数量</h4>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <span class="select">
                                    <select v-model="range">
                                        <option value="week">上一周</option>
                                        <option value="month">上一月</option>
                                        <option value="year">上一年</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </nav>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Line'" :data="linesData" :options="linesOptions"></chartist>
                    </div>
                </article>
            </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">卖坐商品（寄件）</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Pie'" :data="pieData" :options="pieOptions"></chartist>
                    </div>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">卖坐商品（购物）</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Pie'" :data="pieData" :options="pieOptions"></chartist>
                    </div>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <h4 class="title">卖坐商品（综合）</h4>
                    <div class="block">
                        <chartist class="lines-bars" :type="'Pie'" :data="pieData" :options="pieOptions"></chartist>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>

import Chartist from './chartist'

export default {
    components: {
        Chartist
    },

    data() {
        return {
            series: [
                [12, 9, 7, 8, 5, 1, 3]
            ],
            labels: {
                week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            linesOptions: {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            },
            pieData: {
                series: [5, 1, 2]
            },
            pieOptions: {
                chartPadding: 30,
                labelOffset: 60,
                labelDirection: 'explode',
                labelInterpolationFnc(value) {
                    return value
                }
            },
            range: 'week'
        }
    },

    computed: {
        linesData() {
            return {
                labels: this.labels.week,
                series: this.series
            }
        },

        packages() {
            return this.$store.getters.allPackages
        }
    },
    
     created() {
        this.$store.dispatch('getAllPackages')
    },
}

</script>