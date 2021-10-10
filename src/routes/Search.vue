<template>
  <div
    v-show="searching"
    ref="wrapper"
    class="main__items-wrapper">
    <Item
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie" />
  </div>
  <Modal />
  <Spinner />
</template>

<script>
import Item from '~/components/Item';
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';

export default {
  components: {
    Item,
    Modal,
    Spinner,
  },
  data() {
    return {
      observer: new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (this.pageNumber <= this.totalPages && !this.$store.state.searchMovie.modalOn) {
              this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
              observer.unobserve(entry.target);
            }
          }
        });
      }, {
        threshold: 1
      }),
      searching: false
    };
  },
  computed: {
    doneLoading() {
      return !this.$store.state.searchMovie.isLoading;
    },
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
      this.$store.commit('searchMovie/resetPageState');
      if (this.$route.name === 'search') {
        this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
      }
    },
    doneLoading(done) {
      if (done) {
        if (this.$route.name === 'search' && this.movies.length) {
          this.searching = true;
          this.bindObserver(this.$refs.wrapper.lastElementChild.querySelector('img'));
        }
      } 
    }
  },
  mounted() {
    this.$store.dispatch('searchMovie/getMovies', this.$route.query.kw);
  },
  methods: {
    bindObserver(target) {
      target.onload = () => {
        this.observer.observe(this.$refs.wrapper.lastElementChild);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.main__items-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 50px;
}
</style>