<template>
  <Item
    v-for="movie in movies"
    :key="movie.imdbID"
    :movie="movie" />
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
    Spinner
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