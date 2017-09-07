<template>
    <div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <nav class="level">
                    <div class="level-left"><strong>主页Carousels</strong></div>
                    <div class="level-right">
                        添加新照片
                        <div class="control">
                            <input type="file" class="input" @change="handleUpload"></input>
                        </div>    
                    </div>
                </nav>
                <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                        <thead>
                            <tr>
                                <th>图片</th>
                                <th>动作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="carousel in carousels">
                                <td>
                                    <figure class="image is-64x64">
                                        <img v-bind:src="carousel.image">
                                    </figure>
                                </td>
                                <td class="is-icon">
                                    <a v-on:click="remove(carousel['id'])">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                </td>
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

export default {
    name: 'Carousel',

    computed: {
        carousels () {
            return this.$store.getters.allCarousels
        }
    },

    methods: {
        handleUpload (e) {
            const files = e.target.files
            if (files.size === 0) {
                return
            }
            // upload
            const form = new FormData()
            form.append('carousel', files[0])
            this.$store.dispatch('addCarousel', form)
        },

        remove (id) {
            this.$store.dispatch('removeCarousel', id)
        }
    },

    created () {
        this.$store.dispatch('getCarousels')
    }
}
</script>
