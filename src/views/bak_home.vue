<template>
  <section
    class="bg-cover bg-center bg-no-repeat bg-bg2 bg-gray-700 bg-blend-multiply h-90"
  >
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24">
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
      >
        Welcome to Digi Stroy
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
      >
        DIGI Campus 연수생들의 한이 담긴 사이트를 소개합니다.
        <br />점메추! 마니또! 롤링페이퍼!
      </p>
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        <a
          href="#"
          @click="btn_userInfo()"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          사용자 정보
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <a
          @click="btn_off()"
          href="#"
          class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
        >
          로그아웃
        </a>
      </div>
    </div>
  </section>

  <br /><br />


  <!--카드 영역-->
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img class="rounded-t-lg" src="@/assets/santa.png" alt="" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  </div>
  <br /><br />
</template>

<script>
import axios from "axios";
import { getKakaoToken } from "@/views/kakaoLogin.js";
import vueCookies from "vue-cookies";

export default {
  name: "App",
  data() {
    return {
      code: null,
      token: null,
      obj: {
        client_id: "12ae0e55e8683634dad5cd43379a1a84",
        logout_redirect_uri: "http://localhost:8080/logout",
      },
    };
  },
  created() {
    if (this.$route.query.code) {
      this.setKakaoToken();
    }
  },
  methods: {
    async setKakaoToken() {
      console.log("카카오 인증 코드", this.$route.query.code);
      this.code = this.$route.query.code;

      const { data } = await getKakaoToken(this.$route.query.code);
      if (data.error) {
        alert("카카오톡 로그인 오류입니다.");
        this.$router.go();
        return;
      }
      window.Kakao.Auth.setAccessToken(data.access_token);

      console.log("token: ", data.access_token);
      this.token = data.access_token;
      vueCookies.set("access-token", data.access_token, "1d");
      vueCookies.set("refresh-token", data.refresh_token, "1d");
    },

    //사용자 정보 가져오기
    btn_userInfo() {
      console.log("btn_userInfo");
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.properties.nickname);
          console.log(res.data.properties.profile_image);

          let obj = {};
          obj.name = res.data.properties.nickname;
          let url = "http://localhost:3000/kakaomembercheck";
          axios
            .get(url, {
              params: obj,
            })
            .then((res) => {
              console.log(res);
              this.$store.commit("info", res);
              console.log(this.$store.getters.getlogin_info);
              this.login_info = this.$store.getters.getlogin_info;
              console.log(this.login_info.name);
            })
            .catch((error) => {
              // 요청 실패 시 에러 메시지 출력
              console.error("로그인 요청에 실패했습니다:", error);
            });
        });
    },
    // 로그아웃
    async btn_off() {
      vueCookies.keys().forEach((cookie) => vueCookies.remove(cookie));
      await axios
        .post("https://kapi.kakao.com/v1/user/unlink", null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          alert("성공");
          console.log(res);
          this.$router.push("/login");
        });

      this.$store.commit("init");
      console.log(this.$store.getters.getlogin_info);

      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
      }

      window.Kakao.Auth.logout(function () {
        vueCookies.remove("access-token");
        vueCookies.remove("refresh-token");
        alert("로그아웃 되었습니다.", window.Kakao.Auth.getAccessToken());
        this.$router.push("/login");
      });
    },
  },
};
</script>