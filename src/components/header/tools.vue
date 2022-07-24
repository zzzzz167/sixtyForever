<template>
  <div id="tool" :class="{ affix: isNotOnTop, audio: isAudio }">
    <div class="item back-to-top" @click="backToTop">
      <font-awesome-icon icon="fa-solid fa-up-long" />
      <span>{{ progress }}%</span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "Tools",
  data() {
    return {
      progress: 0,
      isNotOnTop: false,
      isAudio: false,
      toolTop: "0vh",
    };
  },
  mounted() {
    const { proxy } = getCurrentInstance();
    this.isAudio = proxy.$configs["player"]["enabled"];
    window.addEventListener("scroll", this.scrollProgress);
  },
  methods: {
    backToTop: function () {
      document.documentElement.scrollTop = 0;
    },
    scrollProgress() {
      this.progress = Math.round(
        ((window.pageYOffset + window.innerHeight) /
          document.body.scrollHeight) *
          100
      );
      if (window.pageYOffset > 90) {
        this.isNotOnTop = true;
      } else {
        this.isNotOnTop = false;
      }
    },
  },
};
</script>

<style lang="scss">
#tool {
  top: 50vh;
  position: fixed;
  left: 1rem;
  z-index: 9;

  .item {
    display: none;
    width: 1.875rem;
    height: 1.875rem;
    opacity: 0.5;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all 0.2s ease-in-out 0s;
    &:hover {
      opacity: 0.9;
    }
  }

  .back-to-top {
    span {
      font-size: 0.75em;
    }
  }

  &.affix {
    text-shadow: none;
    top: auto;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    background: var(--grey-1-a3);
    border-radius: 0.3125rem;
    left: 0;
    bottom: 0;
    .item {
      display: flex;
      color: var(--primary-color);
    }

    .back-to-top {
      align-items: center;
      justify-content: center;
      height: auto;
      padding: 0.3125rem 0 0;
    }
  }
}

@media (min-width: 1200px) {
  #tool.affix {
    left: 1rem;
    bottom: 1rem;
  }
}
@media (max-width: 991px) {
  #tool.affix {
    right: 0;
    bottom: 0;
    left: auto;
  }
}
</style>