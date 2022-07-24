<template>
  <footer id="footer" class="footer container nopadding-x-md">
    <div class="row">
      <div class="col-12 col-md-10 m-auto text-center">
        <div class="copyright">
            <span>「黄粱一梦，山水万重，人间总相逢。」</span>
            <span>Copyright &copy; 2022 Sixty.Forever By 晓栀</span>
            <div class="powered-by">基于vue 托管于Github Page</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
footer {
    padding: 3rem 0 1rem 0;
    color: var(--grey-5);
    font-size: 1rem;
    span{
        display: block;
    }
}
</style>