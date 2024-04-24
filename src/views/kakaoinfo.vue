<template>.</template>

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
      value: {},
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
  mounted() {},
  methods: {
    async setKakaoToken() {
      console.log("카카오 인증 코드", this.$route.query.code);
      this.code = this.$route.query.code;
      this.value.code= this.code;
      const { data } = await getKakaoToken(this.$route.query.code);
      if (data.error) {
        alert("카카오톡 로그인 오류입니다.");
        this.$router.go();
        return;
      }
      window.Kakao.Auth.setAccessToken(data.access_token);

      console.log("token: ", data.access_token);
      this.token = data.access_token;
      this.value.token= this.token;
      console.log("체크"+ this.value.code, this.value.token);
      this.$store.commit("token", this.value);
      console.log(this.$store.getters.gettoken);
      console.log(this.$store.getters.gettoken.code);
      console.log(this.$store.getters.gettoken.token);

      vueCookies.set("access-token", data.access_token, "1d");
      vueCookies.set("refresh-token", data.refresh_token, "1d");
      this.btn_userInfo();
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
          this.kakaologin_status(res.data.properties.nickname);

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
              console.log(this.login_info.login_type);
              this.$router.push("/mainpage");
            })
            .catch((error) => {
              // 요청 실패 시 에러 메시지 출력
              console.error("로그인 요청에 실패했습니다:", error);
            });
        });
    },

    kakaologin_status(a) {
      let obj = {};
      obj.name = a;

      let url = "http://localhost:3000/kakaologin_status";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log("카카오로그인체크");
          console.log(res);
        })
        .catch((error) => {
          console.error(
            "카카오 로그인 상태 업데이트 요청에 실패했습니다:",
            error
          );
        });
    },
  },
};
</script>
