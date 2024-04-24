import { WebClient } from '@slack/web-api';

export  function  memoTest() {
    alert('test');
}

// const { WebClient } = require('@slack/web-api');


const botClient = new WebClient('xoxb-6482976098722-7011475362803-BVgOvuLn3w0LaWM5O6HaszdL'); // 봇 유저 토큰
//const channelId = 'C06UVAY8UCE'; // 전송할 채널 아이디


botClient.chat
	.postMessage({
		channel: 'C06UVAY8UCE', // 전송할 채널 아이디
		text: '<@mrrudals> 롤링페이퍼 메세지가 등록되었습니다.',
	})
	.then(() => {
		console.log('메시지 전송 완료');
	})
	.catch((error) => {
		console.log('오류가 발생했습니다.');
		console.error(error);
	});