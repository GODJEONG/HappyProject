<template>
  <html class="dark">
    <div
      class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 h-200"
    >
      <div class="relative">
        <img
          @click="
            meno_press();
            getmanittomemo();
          "
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
          @click="btn_start() ; mission()"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 border border-red-700 rounded text-3xl"
        >
          Start
        </button>
        <br />
        <br />
      </div>

      <!-- 마니또 보유 영역 -->
      <div v-if="manitto_check" class="mt-0">
        <div class="image-row mt-0">
          <img src="@/assets/santa.png" style="max-width: 150px" />
        </div>

        <h3
          class="text-slate-900 dark:text-slate-400 mt-5 text-5xl font-bold tracking-tight"
        >
         {{name}} 님의 마니또는
        </h3>
        <p class="text-slate-500 dark:text-white mt-2 text-6xl font-bold">
          {{ manitto }} 님 입니다
        </p>
        <br>
        <h2 class="text-slate-500 dark:text-red-400 mt-2 text-3xl font-bold">
          [미션] {{ manitto_mission }}
        </h2>
        <br /><br />

        <div class="flex justify-center">
          <br />
          <textarea
            v-model="meno"
            rows="4"
            maxlength="30"
            class="p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="마니또에게 쪽지를 보내보세요!!(최대 30자)"
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

      <div
        id="memo"
        v-if="meno_check"
        class="absolute inset-0 z-10 flex items-center justify-center top-80"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
        >
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-400">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Manitto Memo
              </h3>
              <button
                type="button"
                @click="meno_check = false"
                class="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
              <p class="text-lg leading-relaxed text-white">
                {{ mymanitto_meno }}
              </p>
            </div>
          </div>
        </div>
      </div>

      
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
      meno_check: false,
      manitto: "",
      manitto_mission: "",
      meno: "",
      name:this.$store.getters.getlogin_info.name,
      mymanitto_meno: "",
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
            console.log(this.name);
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

    getmanittomemo() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/getmemo";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          if (res.data == null || res.data == "") {
            this.mymanitto_meno = "메모가 없습니다!!";
          } else {
            this.mymanitto_meno = res.data[0].manitto_meno; // 마니또 선별
          }
          console.log(this.mymanitto_meno);
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

    mission() {
      let url = "http://localhost:3000/manittomission";
      axios.get(url).then((res) => {
        console.log(res.data);
        this.manitto_mission = this.getRandomMission(res.data); // 마니또 선별
        console.log(this.manitto_mission);
      });
    },

    getRandomMission(array) {
      if (array.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomItem = array[randomIndex];

      if (!randomItem || !randomItem.mission) {
        console.error(
          "Invalid data format or missing 'misiion' property:",
          randomItem
        );
        return null;
      }
      return randomItem.mission;
    },

    meno_press() {
      this.meno_check = true;
    },
  },
  watch: {
    manitto_check() {},
    meno_check() {},
  },
};
</script>

<style>
.image-row {
  display: flex;
  justify-content: center;
}
</style>

