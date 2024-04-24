import axios from "axios"
 
const kakaoHeader = {
  "Authorization": "6640edfc922828730e84a4963279b11c",
  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};
 
const getKakaoToken = async code => {
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "12ae0e55e8683634dad5cd43379a1a84",
      redirect_uri: "http://localhost:8080/kakaoinfo",
      code: code
    };
    
    const queryString = Object.keys(data)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    
    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: kakaoHeader }
    );
    console.log(result);
 
    console.log("카카오 토큰", queryString);
    return result;
  } catch (e) {
    return e;
  }
};
 

 
export { getKakaoToken };
 