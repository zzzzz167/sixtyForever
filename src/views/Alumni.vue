<template>
  <div class="container-fluid mt-5 alumin">
    <h2 class="text-center">Team of us</h2>
    <p class="text-center">顺序不固定,每次刷新排序均会不同</p>
    <div class="container">
      <div v-if="!isGet" class="row justify-content-center p-5">
        <div
          v-for="member in members"
          :key="member.id"
          class="card col-lg-3 col-md-4 col-sm-12"
        >
          <div class="card-body">
            <img v-lazy="member.avatar" class="avatar" />
            <h4 class="card-title">{{ member.name }}</h4>
            <p class="card-text">{{ member.introduce }}</p>
            <ul class="card-social">
              <li
                v-for="social in member.socializing"
                :key="social.key"
                class="social-item"
              >
                <a :href="social.link">
                  <font-awesome-icon
                    :icon="social.icon"
                    class="icon"
                  ></font-awesome-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p class="text-center text-primary mt-5">
          由于某些不可抗力因素,这并不是一份完整的同学录,所以,还请那些没有找到组织的同学,在下面留下你的名字,和头像图片,以及一句话的简单介绍,我看到后会及时将你们加上的
        </p>
        <p class="text-center">tip:网站不是必填项哦</p>
        <p class="text-center">收集进度</p>
        <div class="progress col-lg-8 p-0">
          <div class="progress-bar progress-bar-striped" :style="progress"></div>
        </div>
        <comment class="col-lg-10 p-0 mt-4"></comment>
      </div>
      <div v-else-if="isGet" class="row lod justify-content-center">
        <div v-for="n in 6" :key="n" class="spinner-grow"></div>
        <h4>loding ...</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import yaml from "js-yaml";
import comment from "../components/comment.vue";

export default {
  components: {
    comment,
  },
  data() {
    return {
      isGet: true,
      members: {},
      progress: "width: 0%"
    };
  },
  mounted() {
    axios.get("./yaml/_alumni.yaml").then((res) => {
      const data = yaml.load(res.data);
      data.sort(function () {
        return Math.random() - 0.5;
      });
      this.isGet = false;
      this.members = data;
      this.progress = `width: ${(data.length / 50).toFixed(5) * 100}%`
    });
  },
};
</script>

<style lang="scss">
.lod {
  color: var(--loding);
  text-align: center;
}
.alumin {
  .card {
    z-index: 0;
    position: relative;
    background: var(--card-bg);
    box-shadow: 0 0 0 1px var(--card-bg-shadow);
    padding: 10px;
    box-sizing: border-box;
    transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0.2s ease;
    flex-direction: row;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &:hover {
      z-index: 1;
      box-shadow: 0 8px 50px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
      transition: box-shadow 0.2s ease, transform 0.2s ease, z-index 0s 0s ease;
      .card-social {
        margin: 16px 0 0 !important;
        opacity: 1 !important;
      }
    }

    .card-body {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translate(0, -50%);
      text-align: center;

      .avatar {
        width: 98px;
        height: 98px;
        border-radius: 100%;
        margin: 0 auto 20px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          max-width: 100%;
        }
      }

      .card-title {
        color: var(--text-color);
        font-family: "Roboto", sans-serif;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 2.625rem;
      }

      .card-text {
        color: #6f808a;
        font-family: sans-serif;
        font-size: 0.875rem;
        line-height: 2.375rem;
      }

      .card-social {
        margin: 0 0 -18px;
        opacity: 0;
        padding-left: 0;
        transition: margin 0.2s ease, opacity 0.2s ease;

        .social-item {
          display: inline-block;
          margin: 0 10px;

          a {
            display: block;
          }

          .icon {
            display: block;
            height: 18px;
            transition: fill 0.2s ease;
          }
        }
      }
    }
  }
}

.progress-bar{
  background-color: var(--loding);
}

@media (max-width: 800px) {
  .card {
    width: 50% !important;
    max-width: 50% !important;
    min-width: 50% !important;
    flex-basis: 50% !important;
  }
}
@media (max-width: 600px) {
  .card {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    flex-basis: 100% !important;
  }
}
</style>