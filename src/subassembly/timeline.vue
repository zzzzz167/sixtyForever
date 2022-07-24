<template>
  <div class="container">
    <!-- Left vertical line -->
    <div class="container__line"></div>

    <!-- The timeline items container -->
    <ul class="container__items">
      <!-- Each timeline item -->
      <li class="container__item">
        <!-- The circle and title -->
        <div class="container__top">
          <!-- The circle -->
          <div class="container__circle"></div>

          <!-- The title -->
          <div class="container__title">2021/111</div>
        </div>

        <!-- The description -->
        <div class="container__desc">不知道什么时候建的班</div>
      </li>

       <li class="container__item">
        <!-- The circle and title -->
        <div class="container__top">
          <!-- The circle -->
          <div class="container__circle"></div>

          <!-- The title -->
          <div class="container__title">2021/111</div>
        </div>

        <!-- The description -->
        <div class="container__desc">...</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.container {
  /* Used to position the left vertical line */
  position: relative;
}

.container__line {
  /* Border */
  border-right: 2px solid #aaa;

  /* Positioned at the left */
  left: 16px;
  position: absolute;
  top: 0px;

  /* Take full height */
  height: 100%;
}

.container__items {
  /* Reset styles */
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.container__item {
  margin-bottom: 8px;
}

.container__top {
  /* Center the content horizontally */
  align-items: center;
  display: flex;
}

.container__circle {
  /* Rounded border */
  background-color: rgb(170, 170, 170);
  border-radius: 9999px;

  /* Size */
  height: 32px;
  width: 32px;
}

.container__title {
  /* Take available width */
  flex: 1;
}

.container__desc {
  /* Make it align with the title */
  margin-left: 48px;
}
</style>