<template>
    <div>
       <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <h4 class="title">寄件数量</h4>
                <div class="block">
                    <chartist class="lines-bars" :type="'Line'" :data="linesData" :options="linesOptions"></chartist>
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

    data () {
        return {
            series: [
                [12, 9, 7, 8, 5]
            ],
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            linesOptions: {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            }
        }
    },

    computed: {
        linesData () {
            return {
                labels: this.labels,
                series: this.series
            }
        }
    }
}

</script>