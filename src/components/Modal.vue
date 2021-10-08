<template>
  <teleport to=".app__inner">
    <div
      v-if="modalOn"
      class="main__modal-container"
      @click="closeModal">
      <div
        class="main__modal"
        @click.stop>
        <div class="modal__image">
          <img :src="`${details.Poster}`" />
        </div>
        <div class="modal__info">
          <span class="info__title">🎬{{ details.Title }}</span>
          <span class="info__rated">Rated: {{ details.Rated }}</span>
          <span class="info__released">Released: {{ details.Released }}</span>
          <span class="info__runtime">Runtime: {{ details.Runtime }}</span>
          <span class="info__genre">Genre: {{ details.Genre }}</span>
          <span class="info__director">Director: {{ details.Director }}</span>
          <span class="info__writer">Writer: {{ details.Writer }}</span>
          <span class="info__actors">Actors: {{ details.Actors }}</span>
          <span class="info__plot">{{ details.Plot }}</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  computed: {
    modalOn() {
      return this.$store.state.searchMovie.modalOn;
    },
    details() {
      return this.$store.state.searchMovie.detailResult;
    }
  },
  methods: {
    closeModal(e) {
      console.log(e.target.className);
      const { className } = e.target;
      if (this.$store.state.searchMovie.modalOn && className !== 'main_modal') {
        this.$store.dispatch('searchMovie/toggleModal');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main__modal-container {
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .main__modal {
    position: fixed;
    background-color: $color-main-theme;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(255, 255, 255, .5);
    width: 50%;
    height: 50%;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .modal__image {
      width: 50%;
    }
    .modal__info {
      width: 50%;
      height: 100%;
      display: flex;
      padding: 20px;
      flex-direction: column;
      justify-content: space-between;
      .info__title {
        font-size: 20px;
      }
      .info__writer {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .info__actors {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .info__plot {
        max-height: 30%;
        text-align: start;
        text-overflow: ellipsis;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: $color-main-theme--dark;
          border-radius: 5px;
        }
        &::-webkit-scrollbar-track {
          background-color: $color-main-theme--light;
          border-radius: 5px;
        }
      }
    }
  }
}

</style>