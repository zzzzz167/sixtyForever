<template>
  <nav
    id="navbar"
    class="navbar fixed-top navbar-expand-md scrolling-navbar"
    :class="{
      'navbar-col-show': isopen,
      'navbar-dark': isOnTop,
      'top-nav-collapse': isNavColl,
      up: isUp,
      down: !isUp,
    }"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <strong>{{ site_title }}</strong>
      </router-link>

      <button
        id="navbar-toggler-btn"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="navbarIconButton"
      >
        <div class="animated-icon" :class="{ open: isopen }">
          <span></span><span></span><span></span>
        </div>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportContent">
        <ul class="navbar-nav text-center me-md-auto">
          <li v-for="menu in menus" :key="menu.key" class="nav-item">
            <router-link
              :to="menu.link"
              class="nav-link"
              activeClass="router-active"
            >
              <font-awesome-icon :icon="menu.icon"></font-awesome-icon>
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
        <ul class="right navbar-nav">
          <a
            class="nav-link"
            aria-label="Color Toggle"
            @click="changeColorShame"
          >
            <font-awesome-icon :icon="Sicon"></font-awesome-icon>
          </a>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getCurrentInstance, ref } from "vue";

export default {
  name: "Navigation",
  setup() {
    const { proxy } = getCurrentInstance();
    const menus = proxy.$configs["navbar"]["menu"];
    const site_title = proxy.$configs["site_title"];
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-shame", proxy.$colorShame);
    var Sicon = ref("");

    if (proxy.$colorShame == "dark") {
      Sicon.value = "fa-solid fa-moon";
    } else {
      Sicon.value = "fa-solid fa-sun";
    }

    function changeColorShame() {
      if (this.proxy.$colorShame == "dark") {
        this.proxy.$colorShame = "light";
        Sicon.value = "fa-solid fa-sun";
      } else if (this.proxy.$colorShame == "light") {
        this.proxy.$colorShame = "dark";
        Sicon.value = "fa-solid fa-moon";
      }
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-shame", this.proxy.$colorShame);
      localStorage.setItem("colorShame", this.proxy.$colorShame);
    }

    return {
      site_title: site_title,
      menus: menus,
      proxy,
      changeColorShame,
      Sicon,
    };
  },
  data() {
    return {
      isopen: false,
      isOnTop: true,
      isNavColl: false,
      isUp: true,
      i: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    navbarIconButton: function () {
      this.isopen = !this.isopen;
    },
    handleScroll() {
      const navHeight = document.getElementById("navbar").clientHeight;
      const bannerHeight = document.getElementById("banner").clientHeight;
      if (window.pageYOffset > 0) {
        this.isOnTop = false;
      } else {
        this.isOnTop = true;
      }

      if (window.pageYOffset > 50) {
        this.isNavColl = true;
      } else {
        this.isNavColl = false;
      }

      var scroll = window.pageYOffset - this.i;
      this.i = window.pageYOffset;
      if (scroll > 0 && window.pageYOffset > bannerHeight - navHeight) {
        this.isUp = false;
      } else if (scroll < 0) {
        this.isUp = true;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
.navbar {
  background-color: transparent;
  font-size: 0.875rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease-in-out 0s !important;

  .navbar-brand {
    color: var(--navbar-text-color) !important;
  }

  .navbar-toggler {
    border-width: 0 !important;
    outline: 0;
    &:focus {
      box-shadow: 0 0 0 0 !important;
    }
  }

  .nav-item .nav-link {
    display: block;
    color: var(--navbar-text-color) !important;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  .svg-inline--fa {
    font-size: 0.875rem;
  }

  &.scrolling-navbar {
    will-change: background, padding;
    -webkit-transition: background 0.5s ease-in-out, padding 0.5s ease-in-out;
    transition: background 0.5s ease-in-out, padding 0.5s ease-in-out;
    @media (min-width: 600px) {
      & {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      & .navbar-nav > li {
        -webkit-transition-duration: 1s;
        transition-duration: 1s;
      }
    }
    &.top-nav-collapse {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  .right {
    .nav-link {
      cursor: pointer;
    }
  }
  .nav-item {
    position: relative;
    a {
      display: block;
      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0.1875rem;
        bottom: 0;
        border-radius: 0.125rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: currentColor;
        transition: all .4s ease-in-out 0s;
      }
    }
    .router-active::before {
      width: 80%;
    }
    &:hover {
      a::before {
        width: 80%;
      }
    }
  }

  .animated-icon {
    width: 30px;
    height: 20px;
    position: relative;
    margin: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
      background: #fff;
      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 10px;
      }
      &:nth-child(3) {
        top: 20px;
      }
    }
    &.open {
      span {
        &:nth-child(1) {
          top: 11px;
          -webkit-transform: rotate(135deg);
          -moz-transform: rotate(135deg);
          -o-transform: rotate(135deg);
          transform: rotate(135deg);
        }
        &:nth-child(2) {
          opacity: 0;
          left: -60px;
        }
        &:nth-child(3) {
          top: 11px;
          -webkit-transform: rotate(-135deg);
          -moz-transform: rotate(-135deg);
          -o-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .navbar {
    font-size: 1rem;
    line-height: 2.5rem;
    .nav-item {
      .router-active::before {
        width: 40% !important;
      }
      &:hover {
        a::before {
          width: 40% !important;
        }
      }
    }
  }
}

.top-nav-collapse.up {
  transform: translateY(0);
}
.top-nav-collapse.down {
  transform: translateY(-100%);
}

.top-nav-collapse,
.navbar-col-show {
  @supports (-webkit-backdrop-filter: blur(var(--navbar-glass-px))) or
    (backdrop-filter: blur(var(--navbar-glass-px))) {
    & {
      background: var(--navbar-bg);
      -webkit-backdrop-filter: blur(var(--navbar-glass-px));
      backdrop-filter: blur(var(--navbar-glass-px));
      color: var(--navbar-text-color) !important;
    }
  }
  @supports not (
    (-webkit-backdrop-filter: blur(var(--navbar-glass-px))) or
      (backdrop-filter: blur(var(--navbar-glass-px)))
  ) {
    & {
      background: rgb(var(--navbar-bg-color));
    }
  }
}

.right .nav-link {
  color: var(--navbar-text-color) !important;
  text-align: center;
}
</style>