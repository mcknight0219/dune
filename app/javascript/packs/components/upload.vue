<template>
  <div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <nav class="level">
          <div class="level-left"><strong>上传照片</strong></div>
          <div class="level-right"><input type="text" class="input" placeholder="包裹单号"></div>
        </nav>
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow">
            <thead>
              <tr>
                <th>包裹号</th>
                <th>身份证号</th>
                <th>身份证照片</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in uploads">
                <td>
                  {{ u.package }}
                </td>
                <td>
                  {{ u.id_number }}
                </td>
                <td>
                  <a class="is-icon" v-bind:href="u.id_front">
                    <i class="fa fa-id-card-o" aria-hidden="true"></i>
                  </a>
                  <a class="is-icon" v-bind:href="u.id_back">
                    <i class="fa fa-id-card" aria-hidden="true"></i>
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
import Api from '../api'
export default {
    name: 'Upload',

    components: {
    },

    computed: {
       uploads () {
         return this.$store.getters.allUploads
       } 
    },

    data() {
        return {
        }
    },

    methods: {
    },

    created () {
      this.$store.dispatch('getAllUploads')
    }
}
</script>