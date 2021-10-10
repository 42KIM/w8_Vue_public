<template>
  <div class="header__searchBar">
    <form
      class="searchBar__form"
      @submit.prevent="onSubmit">
      <input
        v-model="inputText"
        type="text"
        class="searchBar__input"
        placeholder="input movie keywords.." />
      <button
        class="searchBar__button btn btn-primary"
        type="submit">
        Find
      </button> 
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: ''
    };
  },
  watch: {
    $route() {
      if (this.$route.name === 'home') {
        this.inputText = '';
      }
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: 'search',
        query: {kw: `${this.inputText}`}
      });
    }
  }
};
</script>

<style lang="scss">
.header__searchBar{
  width: 100%;
  display: flex;
  justify-content: center;
  .searchBar__form {
    width: 40%;
    display: flex;
    .searchBar__input {
      width: 100%;
      &::placeholder {
        color: $color-main-font--lighter;
        font-size: 14p;
        text-align: center;
      }
    }
    .searchBar__button {
      border-color: $color-main-font--light;
      background-color: $color-main-theme--light;
      width: 70px;
      color: $color-main-font;
    }
  }
}
</style>