<template>
  <div class="container-fluid index">
    <div class="container">
      <div class="row">
        <div
          class="pome text-center"
          v-observe-visibility="{ callback: visibilityChanged, once: true }"
          data-animate="animate__animated  animate__fadeIn"
        >
          <h3>永遇乐•梦别</h3>
          <p>秋月凌空，天江一色，沉暮昏醉。</p>
          <p>玉露沾衣，霜风破泪，上下无限水。</p>
          <p>沙沙曳曳，凄凄切切，千瓣苦花飘坠。</p>
          <p>望当时、朱阑碧宇，庆云万里竞退。</p>
          <p>兰舟念去，强风难免，重雾迷尘晦昧。</p>
          <p>两处哀情，二轮悲月，船动逐波碎。</p>
          <p>他年桂夜，花灯聚火，又是晓秋明媚。</p>
          <p>那时看、牛郎织女，鹊桥再会。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      if (entry.isIntersecting) {
        entry.target.className += " " + entry.target.dataset.animate;
        delete entry.target.dataset.animate;
      }
    },
  },
};
</script>

<style lang="scss">
.pome {
  margin-top: 6rem;
  height: auto;
  writing-mode: tb-rl;
  display: flex;
  color: transparent;
  flex-direction: column;
  justify-content: center;
  font-family: "FZSJSJW";
  &.animate__animated {
    color: var(--text-color);
  }
  p{
    font-size: 1.25em;
    font-weight: 600;
  }
  h3{
    font-weight: 800;
  }
}
@media (max-width: 991px) {
  .pome {
    writing-mode: horizontal-tb;
    margin-top: 3rem;
    height: auto;
    display: block;
    p {
      margin-bottom: 0.7rem;
      font-weight: 600;
    }
    h3{
      font-weight: 800;
    }
  }
}
</style>