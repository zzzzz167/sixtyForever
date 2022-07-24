<template>
    <header id="header">
        <div class="inner" :style="{height: bannerHeight}">
            <Navigation/>
            <Banner />
        </div>
        <Tools />
    </header>
</template>

<script>
import Navigation from './header/navigation.vue'
import Banner from './header/banner.vue'
import Tools from './header/tools.vue'

export default {
    name: "Header",
    components:{
        Navigation,
        Banner,
        Tools
    },
    data(){
        return {
            bannerHeight: 0,
        }
    },
    created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.bannerHeight = `${this.$route.meta["banner_img_height"]}vh`
      }
    );
  }
}
</script>
