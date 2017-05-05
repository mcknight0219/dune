<template>
    <div>
        <div class="panel-title">
            <strong>寄件管理</strong>
        </div>
    
        <div class="tile is-parent is-4">
            <article class="tile is-child box">
                <p class="field has-addons">
                    <span class="select">
                        <select v-model="downloadType">
                            <option value="normal">普货</option>
                            <option value="luxury">轻奢</option>
                        </select>
                    </span>
                    <input v-model="dateVal" class="input" type="text" ref="pickrEl">
                    <a class="button" @click="download" v-bind:disabled="dateVal === null"><span class="icon"><i class="fa fa-download" aria-hidden="true"></i></span></a>
                </p>
            </article>
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
                <nav class="level">
                    <div class="level-left">
                        <strong>邮寄列表</strong>
                    </div>
                    <div class="level-right">
                        <input type="text" class="input" placeholder="订单号码，名字等" v-model="q">
                    </div>
                </nav>
                <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>订单号 <i class="fa" v-bind:class="{ 'fa-sort-asc': sortID === 'asc', 'fa-sort-desc': sortID === 'desc' }" style="vertical-align: middle" v-on:click="toggleSortID"></i></th>
                            <th>时间 <i class="fa" v-bind:class="{ 'fa-sort-asc': sortTime === 'asc', 'fa-sort-desc': sortTime === 'desc' }" style="vertical-align: middle" v-on:click="toggleSortTime"></i></th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in packages">
                            <td><a href="">{{ p.serial }}</a></td>
                            <td>{{ new Date(p.created_at).toISOString().slice(0, 10) }}</td>
                            <td class="is-icon">
                               <a href="" class="is-shipped"><i class="fa fa-circle" aria-hidden="true"></i></a>
                               <a href=""><i class="fa fa-bell-o" aria-hidden="true"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </article>
        </div>
    </div>
    </div>
</template>

<style lang="scss">
    .is-pending {
        color: yellow
    }

    .is-received {
        color: beige
    }

    .is-shipped {
        color:aquamarine
    }
</style>

<script>
import Flatpickr from 'flatpickr'
import Api from '../api'

export default {
    name: 'Package',

    computed: {
        packages() {
            if (this.inSearch)
                return this.results
            else
                return this.$store.getters.allPackages
        },

        updatingPackage() {
            return this.$store.getters.updatingPackage
        },
        today() {
            return new Date()
        },
        maxDate() {
            let d = new Date()
            d.setDate(32)
            return d
        }
    },

    data() {
        return {
            q: '',
            inSearch: false,
            results: [],

            sortID: 'desc',
            sortTime: 'desc',
            state: 'all',

            downloadType: 'normal',
            dateVal: null,
            flatPickr: null,
            option: {}
        }
    },

    watch: {
        q: function (val) {
            if (val !== undefined && val !== null && val.length > 3) {
                this.inSearch = true
                this.results = this.search(val)
            } else {
                this.inSearch = false
                this.results = []
            }
        },

        state: function (val) {
            if (val === 'all') {
                this.inSearch = false
                this.results = []
            } else {
                this.inSearch = true
                this.results = this.$store.getters.allPackages.filter(function (p) {
                    return p.status === val
                })
            }
        }
    },

    methods: {
        download() {
            Api.download(this.dateVal, this.downloadType)
        },

        isLuxury(pkg) {
            return pkg.serial.substring(0, 2) == 'SU'
        },

        toggleSortID() {
            this.sortID = (this.sortID === 'desc') ? 'asc' : 'desc'
            this.packages.sort((a, b) => {
                return this.sortID === 'asc' ?
                    a.serial.substr(2) < b.serial.substr(2) : a.serial.substr(2) > b.serial.substr(2)
            })
        },

        toggleSortTime() {
            this.sortTime = (this.sortTime === 'desc') ? 'asc' : 'desc'
            this.packages.sort((a, b) => {
                return this.sortTime === 'asc' ?
                    a.created_at < b.created_at : a.created_at > b.created_at
            })
        },

        idFrontUrl(p) {
            return p.address.id_front
        },

        idBackUrl(p) {
            return p.address.id_back
        },

        hasId (addr) {
            return addr.id_number !== null && addr.id_number.length > 0 && addr.id_front.indexOf("missing") > 0 && addr.id_back.indexOf("missing") > 0
        },

        idPhotoUploadUrl (p) {
            return '/photos/' + p.id
        },

        updateStatus(p) {
            this.$store.dispatch('updatePackage', p)
        },

        search(qs) {
            const pkgs = this.$store.getters.allPackages
            var results = []
            pkgs.forEach((pkg) => {
                const mesh = pkg.serial + pkg.address.name + pkg.address.mobile + pkg.address.id_number

                if (mesh.toLowerCase().indexOf(qs.toLowerCase()) >= 0) {
                    results.push(pkg)
                }
            })

            return results
        }

    },

    created() {
        this.$store.dispatch('getAllPackages')
    },

    mounted() {
        const el = this.$refs.pickrEl
        this.options = {
            mode: 'range',
            maxDate: "today",
            dateFormat: "m/d/Y"
        },
            this.flatPickr = new Flatpickr(el, this.options)
    },

    beforeDesotry() {
        if (this.flatPickr) {
            this.flatPickr.destroy()
            this.flatPickr = null
        }
    }

}
</script>

<style lang="css">
.field__width--40 {
    width: 40%;
}
</style>




