<template>
    <div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <nav class="level">
                    <div class="level-left"><strong>心愿单</strong></div>
                </nav>
                <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                        <thead>
                            <tr>
                                <th>内容</th>
                                <th>用户</th>
                                <th>日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="w in wishes">
                                <td>{{ w.data }}</td>
                                <td>{{ w.user.email }}</td>
                                <td>{{ new Date(w.created_at).toISOString().slice(0, 10) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Api from '../api'
export default {
    name: 'Wish',

    computed: {
        wishes () {
            return this.$store.getters.wishes
        }
    },

    created () {
        this.$store.dispatch('getWishlist')
    }
}
</script>
