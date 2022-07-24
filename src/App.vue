<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition mode="out-in" >
        <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>

<style>

</style>