<template>
  <section class="relative z-0 bg-cover bg-center bg-no-repeat bg-lg">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-3xl font-semibold text-white dark:text-white"
      >
        <img class="w-8 h-8 mr-2" src="@/assets/game1.png" alt="logo" />
        Digi Game World
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your ID</label
              >
              <input
                v-model="id_input"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ID를 입력하세요."
                required=""
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password_input"
                type="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="ml-3 text-sm"></div>
              </div>
              <!-- <a
                @click="findpw()"
                href="#"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Forgot password?</a
              > -->
            </div>

            <button
              @click="baselogin()"
              class="mb-0 w-full h-12 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>

            <button class="w-full h-12" @click="kakaologin()">
              <img
                src="@/assets/kakaologin.png"
                alt="kakao"
                class="w-full h-12"
              />
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                @click="join_press"
                href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Sign up</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    id="join"
    v-if="join_check"
    class="absolute inset-0 z-10 flex items-center justify-center top-10"
  >
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-start">
          <div class="ml-3 text-sm"></div>
        </div>
        <button
          @click="join_check = false"
          class="relative top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          <!-- x 아이콘 -->
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <h1 class="text-2xl">회원가입</h1>

      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div class="mb-6">
          <label
            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >ID</label
          >
          <input
            v-model="id"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ID 입력"
            required
          />

          <div class="flex items-center justify-start mt-1">
            <div class="flex items-start mt-0">
              <div class="ml-3 text-lg"></div>
            </div>
            <a
              @click="id_check()"
              href="#"
              class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Check your ID</a
            >
          </div>
        </div>

        <div class="mb-6">
          <label
            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="이름 입력"
            required
          />
          <div class="flex items-center justify-start mt-1">
            <div class="flex items-start mt-0">
              <div class="ml-3 text-lg"></div>
            </div>
            <a
              @click="name_check()"
              href="#"
              class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >Check you're Digi Family</a
            >
          </div>
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="pw"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm password</label
          >
          <input
            v-model="pw2"
            type="password"
            id="confirm_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          @click="createaccount()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<!-- <script> -->
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      join_check: false,
      name: "",
      name_result: false,
      id: "",
      id_result: false,
      pw: "",
      pw2: "",
      id_input: "",
      password_input: "",
      login_info: {},
    };
  },
  methods: {
    id_check() {
      let obj = {};
      obj.id = this.id;
      let url = "http://localhost:3000/idcheck";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.exists) {
            alert("중복된 ID입니다.");
            this.id_result = false;
          } else {
            console.log("사용 가능한 ID입니다.");
            alert("사용 가능한 ID입니다.");
            this.id_result = true;
          }
        })
        .catch((error) => {
          // 요청 실패 시 에러 메시지 출력
          console.error("ID 확인 요청에 실패했습니다:", error);
        });
    },

    name_check() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/namecheck";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data.exists) {
            alert("DIGI Campus 멤버가 아닙니다. 가입이 불가능합니다!");
            this.name_result = false;
          } else {
            console.log("DIGI Campus 멤버입니다.");
            alert("DIGI Campus 멤버입니다. 가입 가능합니다!");
            this.name_result = true;
          }
        })
        .catch((error) => {
          // 요청 실패 시 에러 메시지 출력
          console.error("name 확인 요청에 실패했습니다:", error);
        });
    },

    pw_check() {
      if (this.pw == null || this.pw == "") {
        alert("비밀번호를 입력해주세요");
        return false;
      } else if (this.pw != this.pw2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      } else return true;
    },

    createaccount() {
      let obj = {};
      obj.name = this.name;
      obj.id = this.id;
      obj.pw = this.pw;

      if (!this.pw_check()) {
        return;
      }
      if (!this.id_result) {
        alert("Check your ID again");
        return;
      }
      if (!this.name_result) {
        alert("Check your name again");
        return;
      }

      let url = "http://localhost:3000/memberinsert";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          this.join_check = false;
        })
        .catch((error) => {
          // 요청 실패 시 에러 메시지 출력
          console.error("회원가입 요청에 실패했습니다:", error);
        });
    },

    join_press() {
      this.join_check = true;
    },

    baselogin_status() {
      let obj = {};
      obj.id = this.id_input;
      obj.password = this.password_input;

      let url = "http://localhost:3000/baselogin_status";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(
            "일반 로그인 상태 업데이트 요청에 실패했습니다:",
            error
          );
        });
    },

    baselogin() {
      let obj = {};
      obj.id = this.id_input;
      obj.password = this.password_input;

      let url = "http://localhost:3000/membercheck";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);

          if ((res.data == "null") | (res.data == "")) {
            alert("ID 혹은 PW가 다릅니다. 다시 입력해주세요");
            return;
          } else {
            console.log(res);

            this.$store.commit("info", res);
            console.log(this.$store.getters.getlogin_info);
            this.login_info = this.$store.getters.getlogin_info;
            console.log(this.login_info.name);
            console.log(this.login_info.login_type);
            this.baselogin_status();
            this.$router.push("/mainpage");
          }
        })
        .catch((error) => {
          // 요청 실패 시 에러 메시지 출력
          console.error("로그인 요청에 실패했습니다:", error);
        });
    },

    kakaologin() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/kakaoinfo",
        prompt: "select_account",
      });
    },

    findpw() {},
  },
  watch: {
    password_input() {},
    id_input() {},
  },
};
</script>