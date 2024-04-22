<template>
  <html class="dark">
    <div
      class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 h-screen"
    >
      <div class="relative">
        <img @click="menoopen"
          src="@/assets/alram.png"
          class="max-w-4xl transition-transform duration-300 transform hover:scale-110"
          style="max-width: 50px"
        />
      </div>
      <br />

      <br /><br />
      <!-- 기본 영역 -->
      <div v-if="!manitto_check">
        <div class="image-row">
          <img src="@/assets/box.png" style="max-width: 150px" />
        </div>
        <h3
          class="text-slate-900 dark:text-white mt-5 text-6xl font-bold tracking-tight"
        >
          Happy Santa
        </h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-3xl">
          마니또를 정해볼까요?
        </p>
        <br />
        <br />
        <button
          @click="btn_start"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 border border-red-700 rounded text-3xl"
        >
          Start
        </button>
        <br />
        <br />
        <span
          class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 text-3xl"
        >
          !!마니또가 보낸편지!!
        </span>
      </div>

      <!-- 마니또 보유 사용자 -->
      <div v-if="manitto_check">
        <div class="image-row">
          <img src="@/assets/santa.png" style="max-width: 150px" />
        </div>

        <h3
          class="text-slate-900 dark:text-white mt-5 text-6xl font-bold tracking-tight"
        >
          당신의 마니또는
        </h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-4xl font-bold">
          {{ manitto }} 입니다
        </p>
        <br />
        <br />

        <div class="flex justify-center">
          <br />
          <textarea
            v-model="meno"
            rows="4"
            class="p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="마니또에게 쪽지를 보내보세요!!"
          ></textarea>
        </div>

        <br />
        <button
          @click="manitto_meno"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 border border-red-700 rounded text-3xl"
        >
          쪽지 보내기
        </button>
        &nbsp;
        <button
          @click="manitto_delete"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 border border-red-700 rounded text-3xl"
        >
          초기화
        </button>
      </div>

      <br />
      <br />
    </div>
  </html>
</template>


<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      manitto_check: false,
      manitto: "",
      meno: "",
      name: "최은숙",
    };
  },
  methods: {
    // 회원 DB 중 마니또 가능 인원 저장
    btn_start() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/manittopossible";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res.data);
          this.manitto = this.getRandomName(res.data); // 마니또 선별
          if (this.manitto === null) {
            alert("매칭가능한 마니또가 없습니다!!");
          } else {
            this.manitto_update();
          }
          console.log(this.manitto);
        });
    },
    // 내 마니또 db 추가
    manitto_update() {
      let obj = {};
      obj.name = this.name;
      obj.manitto = this.manitto;
      let url = "http://localhost:3000/manittoupdate";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          this.manitto_check = true;
          console.log(this.manitto_check);
        });
    },

    // 마니또 초기화
    manitto_delete() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/manittodelete";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          this.manitto_check = false;
          console.log(this.manitto_check);
        });
    },
    // 마니또 쪽지
    manitto_meno() {
      let obj = {};
      obj.meno = this.meno;
      obj.manitto = this.manitto;
      console.log(obj);
      let url = "http://localhost:3000/manittomeno";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          alert(this.manitto + "에게 전달 완료");
        });
    },

    getRandomName(array) {
      if (array.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomItem = array[randomIndex];

      if (!randomItem || !randomItem.NAME) {
        console.error(
          "Invalid data format or missing 'NAME' property:",
          randomItem
        );
        return null;
      }
      return randomItem.NAME;
    },
  },
  watch: {
    manitto_check() {},
  },
};
</script>

<style>
.image-row {
  display: flex;
  justify-content: center;
}
</style>

