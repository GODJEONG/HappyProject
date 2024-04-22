import axios from "axios"
 
const kakaoHeader = {
  "Authorization": "844a9841b183504680730c5584e2b853",
  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};
 
const getKakaoToken = async code => {
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "94bab9d1be45fe28119281892cb2a954",
      redirect_uri: "http://localhost:8080/kakaoLogin",
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
 