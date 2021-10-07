<template>
  <div
    v-for="movie in movies"
    :key="movie.imdbID"
    class="main__item"
    @click="showDetails(movie.imdbID)">
    <div class="item__poster-wrapper">
      <img
        class="item__poster"
        :src="`${movie.Poster}`" />
    </div>
    <div class="item__info">
      <span class="info__year">{{ movie.Year }}</span>
      <span class="info__title">{{ movie.Title }}</span>
    </div>
  </div>
  <Modal />
  <Spinner />
</template>

<script>
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';

export default {
  components: {
    Modal,
    Spinner
  },
  props: {
    
  },
  computed: {
    movies() {
      return this.$store.state.searchMovie.searchResults;
    },
    pageNumber() {
      return this.$store.state.searchMovie.pageNumber;
    },
    totalPages() {
      return this.$store.getters['searchMovie/totalPages'];
    }
  },
  watch: {
    $route() {
      console.log(`${this.$route.query.kw}로 주소 바뀜!`);
      this.$store.commit('searchMovie/resetPageState');
      this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
    }
  },
  created() {
    this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
    this.bindScrollEvent();
  },
  methods: {
    showDetails(id) {
      console.log('클릭', id);
      this.$store.dispatch('searchMovie/getDetails', id);
    },
    bindScrollEvent() {
      const footer = document.querySelector('footer');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (this.pageNumber <= this.totalPages && !this.$store.state.searchMovie.modalOn) {
              this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
            }
          }
        });
      }, {
        threshold: 0.5
      });
      observer.observe(footer);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/scss/_mixins.scss';

.main__item {
  width: calc(20% - ($margin-item * 2));
  max-height: 50vh;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: $margin-item;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  cursor: pointer;
  @include media-items;
  &:hover {
    transform: rotate(2deg);
  }
  .item__poster-wrapper {
    background-color: yellowgreen;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    .item__poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .item__info {
    background-color: $color-main-theme;
    width: 100%;
    min-height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .info__year {
      text-align: center;
      color: $color-main-font;
    }
    .info__title {
      width: 100%;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>