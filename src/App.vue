<template>
  <div
    class="app__inner">
    <header class="app__header">
      <div
        class="header__logo"
        @click="$router.push('/')">
        <span class="logo__text">SEARCH🍳MOV</span>
      </div>
      <SearchBar />
    </header>
    <main class="app__main">
      <div class="main__inner">
        <RouterView />
      </div>
    </main>
    <footer class="app__footer">
      <span class="footer__text">
        “Cinema is a matter of what's in the frame and what's out”
      </span>
    </footer>
  </div>
</template>

<script>
import SearchBar from '~/components/SearchBar';

export default {
  components: {
    SearchBar
  }
};
</script>

<style lang="scss" scoped>
@import '~/scss/_mixins.scss';
.app__inner {
  position: relative;
  // height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: $font-main;
  header {
    box-sizing: border-box;
    background-color: $color-main-theme--header;
    position: sticky;
    top: 0;
    z-index: 9998;
    height: $height-header;
    display: flex;
    align-items: center;
    padding: 0 50px;
    flex-shrink: 0;
    .header__logo {
      width: $width-logo;
      position: absolute;
      font-size: 25px;
      flex-shrink: 0;
      cursor: pointer;
      margin-left: 10px;
      @include media-logo;
      .logo__text {
        color: $color-main-font;
      }
    }
  }
  main {
    flex-grow: 1;
    .main__inner {
      width: 100%;
      min-height: calc(100vh - ($height-header + $height-footer));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  footer {
    background-color: $color-main-theme--light;
    height: $height-footer;
    color: $color-main-font--light;
    text-align: center;
    .footer__text {
      width: 400px;
      line-height: $height-footer;
    }
  }
}
</style>