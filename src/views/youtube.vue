<template>
  <div>
    <h1>Hello</h1>

    <!-- YouTube 비디오를 불러오는 iframe -->
    <iframe
      id="player"
      type="text/html"
      width="640"
      height="360"
      :src="'https://www.youtube.com/embed/' + videoId"
      frameborder="0"
      allowfullscreen
    ></iframe>

    <!-- 동영상을 재생하는 버튼 -->
    <button @click="playVideo">Play</button>
  </div>
</template>

<script>
import Vue from "vue";
import VueYoutube from "vue-youtube";

Vue.use(VueYoutube);

export default {
  name: "App",
  data() {
    return {
      videoId: "9xRxUk37uoY", // 실제 YouTube 비디오의 ID로 수정
      playerVars: {
        autoplay: 1,
      },
    };
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log("we are watching!!!");
    },
  },
};
</script>
<style>
* {
  font-family: 국민연금체, 나눔스퀘어라운드, 에스코어 드림;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
