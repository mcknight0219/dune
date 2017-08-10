<template>
    <div id="app">
        <section class="hero is-bold app-navbar animated slideInDown">
            <div class="hero-head">
                <nav class="nav">
                    <div class="nav-left">
                        <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!show)">
                            <i aria-hidden="true" class="fa fa-bars"></i>
                        </a>
                    </div>
                    <div class="nav-center">
                        <a class="nav-item hero-brand" href="/">
                            <div class="is-hidden-mobile">
                                <span><strong>Dashboard</strong></span>
                            </div>
                        </a>
                    </div>
                    <div class="nav-right is-flex">
                        <a href="/" style="margin-top:15px; margin-right:25px;"><span class="icon"><i class="fa fa-home"></i></span></a>
                    </div>
                </nav>
            </div>
        </section>
        <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show}">
            <p class="menu-label"> 
                General
            </p>
            <ul class="menu-list">
                <li>
                    <router-link to="home" active-class="is-active">
                        <span class="icon is-small">
                            <i class="fa fa-tachometer" aria-hidden="true"></i>
                        </span> Dashboard
                    </router-link>
                </li>
                <li>
                    <router-link to="package" active-class="is-active">
                        <span class="icon is-small">
                            <i class="fa fa-truck" aria-hidden="true"></i>
                          </span> 邮寄
                    </router-link>
                </li>
                <li>
                    <router-link to="order" active-class="is-active">
                        <span class="icon is-small"><i class="fa fa-shopping-bag" aria-hidden="true"></i></span> 订单
                    </router-link>
                </li>
                <li>
                    <router-link to="manage-product" active-class="is-active">
                        <span class="icon is-small"><i class="fa fa-desktop" aria-hidden="true"></i></span> 商品
                    </router-link>
                </li>
                <li>
                    <router-link to="upload" active-class="is-active">
                        <span class="icon is-small"><i class="fa fa-picture-o"></i></span> 上传照片
                    </router-link>
                </li>
            </ul>
        </aside>
        <section class="app-main">
            <div class="container is-fluid is-marginless app-content">
                <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
                    <router-view class="animated"></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
// Responsiveness
// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
$tablet: 769px !default;
// 960px container + 40px
$desktop: 1000px !default;
// 1152px container + 40
$widescreen: 1192px !default;
// 1344px container + 40
$fullhd: 1384px !default;


.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}

.hero {
  align-items: stretch;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 180px;
  min-width: 45px;
  max-height: 100vh;
  z-index: 1;
  height: calc(100% - 50px);
  background: #fff;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: $tablet - 1px) {
    transform: translate3d(-180px, 0, 0);
  }
}

.menu {
    font-size: 1rem;
}

.slideInLeft {
    animation-name: slideInLeft;
}

.slideOutLeft {
    animation-name: slideOutLeft;
}

.app-main {
  padding-top: 50px;
  margin-left: 180px;
  transform: translateZ(0);

  @media screen and (max-width: $tablet - 1px) {
      margin-left: 0;
  }
}

.app-content {
  padding: 20px;
}

.grid {
  border: 1px solid #DDD;
  width: 276px;
  .box {
    position: relative;
    border: 1px solid black;
    width: 80px;
    float: left;
    margin: 5px;
    min-height: 80px;

    a {
      position: absolute;
      cursor: pointer;
      width: 100%;
      top: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      span {
        font-size: 2rem;
      }
    }
  }
}

.address-list {
  height: 0px;
  overflow: hidden;
  transition: height 0.5s;
  
  p {
    margin-bottom: 5px;
  }
}

.toggle {
  display: none;
  visibility: hidden;

  &:checked ~ .address-list {
    height: auto;
  }
}

.toggle-label {
    display: block;
    padding: 0.5em;
    font-weight: 400;


    &:after {
      padding-left: 6px;
    }

    &:hover {
      cursor: pointer;
      color: #999;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
    }

</style>

<script>
import Home from './components/home'
import Order from './components/order'
import ManageProduct from './components/ManageProduct'
import Package from './components/package'
import Upload from './components/upload'
import store from './store'

export default {
    name: 'dashboard',
    store,
    components: {
        Home,
        Order,
        ManageProduct,
        Package,
        Upload
    },

    computed: {
        show () {
            return this.$store.getters.sidebar
        }
    },

    methods: {
        toggleSidebar (opened) {
            this.$store.dispatch('toggleSidebar', opened)
        }
    },

    beforeMount () {
        const { body } = document
        const WIDTH = 768
        const RATIO = 3

        const handler = () => {
            if (!document.hidden) {
                
                let rect = body.getBoundingClientRect()
                let isMobile = rect.width - RATIO < WIDTH
                this.$store.dispatch('toggleDevice', isMobile)
                this.toggleSidebar(!isMobile)
            }
        }

        document.addEventListener('visibilitychange', handler)
        window.addEventListener('DOMContentLoaded',  handler)
        window.addEventListener('resize', handler)
    }
}
</script>