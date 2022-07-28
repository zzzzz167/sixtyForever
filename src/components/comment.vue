<template>
  <Waline :serverURL="serverURL" :path="path" dark='html[data-shame="dark"]'/>
</template>
<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Waline } from "@waline/client/dist/component";
import '@waline/client/dist/waline.css';

export default {
  name: "comment",
  components: {
    Waline,
  },
  setup() {
    const path = computed(() => useRoute().path);
    const darkmode = ref(false);
    return {
      path: path,
      darkmode: darkmode,
    };
  },
  data() {
    return {
      serverURL: "https://waline-zzzzz167.vercel.app",
    };
  }
};
</script>>