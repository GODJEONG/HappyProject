<template>
  <h1>Login</h1>
  <button @click="loginStart">로그인</button>
</template>

<script>
export default {
  name: "loginComponent",
  methods: {
    loginStart() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/kakao",
      });
    },

  },
};
</script>