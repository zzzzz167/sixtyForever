<template>
  <div
    id="banner"
    class="banner"
    parallax="true"
    :style="{ background: banner_img }"
  >
    <div class="full-bg-img">
      <div class="mask flex-center">
        <div class="banner-text text-center fade-in-up">
          <div class="h2">
            <span class="subtitle">{{ obj.output }}</span>
            <span class="typed-cursor">{{ cursorChar }}</span>
          </div>
          <div class="page-meta">
            <span>{{ tip }}</span>
          </div>
        </div>

        <div class="scroll-down-bar" @click="scrollDown">
          <font-awesome-icon
            icon="fa-solid fa-angle-down"
            class="banner-down-bar"
          ></font-awesome-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EasyTyper from 'easy-typer-js'

export default {
  name: "Banner",
  data() {
    return {
      banner_img: "",
      tip: "",
      cursorChar: "✤",
      obj: {
        output: '',
        isEnd: false,
        speed: 90,
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      }
    };
  },
  methods: {
    scrollDown: function () {
      const bannerHeight = document.getElementById("banner").clientHeight;
      document.documentElement.scrollTop = bannerHeight;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.tip = this.$route.meta["tip"]
        this.banner_img = `url(${this.$route.meta["banner_img"]}) center center / cover no-repeat`;
        const typed = new EasyTyper(this.obj, this.$route.meta["sub_title"]);
      }
    );
  },
};
</script>

<style lang="scss">
.banner {
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: default;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &[parallax="true"] {
    will-change: transform;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: transform 0.05s ease-out;
  }
  .banner-text {
    color: var(--subtitle-color);
    max-width: calc(960px - 6rem);
    width: 80%;
    overflow-wrap: break-word;
    .typed-cursor{
      margin-left: 10px;
      opacity: 1;
      -webkit-animation: blink 0.7s infinite;
      -moz-animation: blink 0.7s infinite;
      animation: blink 0.7s infinite;
    }
  }

  .scroll-down-bar {
    position: absolute;
    width: 100%;
    height: 6rem;
    text-align: center;
    cursor: pointer;
    bottom: 0;
    .banner-down-bar {
      font-size: 2rem;
      font-weight: bold;
      display: inline-block;
      position: relative;
      padding-top: 2rem;
      color: var(--subtitle-color);
      transform: translateZ(0);
      animation: scroll-down 1.5s infinite;
    }
  }
}
.flex-center {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100%;
}
</style>