<코딩 알려주는 누나 유튜브 채팅앱 만들기>
1강. https://www.youtube.com/watch?v=uE9Ncr6qInQ
2강. https://www.youtube.com/watch?v=oFiw5VvgRFg
3강. https://www.youtube.com/watch?v=pRGOEtGjI-k

1. 백엔드 세팅: 데이터베이스 세팅, 웹소켓 세팅
2. 프론트엔드 세팅: 웹소켓 세팅
3. 백엔드 프론트엔드 연결 테스트
4. 유저 로그인
5. 메세지 주고받기

[mongo DB 설치]
1. brew 설치 및 업데이트
2. brew tap mongodb/brew
3. brew install mongodb-community
4. brew services start mongodb-community

[node module setup]
1. npm install express =>
2. npm install mongoose => mongoDB 데이터베이스 연결할 수 있게 도와줌
3. npm install cors => 데이터베이스의 모든 접근을 허용할 수 있게 도와줌 (테스트용)
4. npm install dotenv => .env 파일로 환경변수를 쓸수있게 해줌
5. npm install http => 
[축약] npm i express mongoose cors dotenv http

6. npm install -g nodemon => 파일의 변화가 생기면 스스로 리로딩 시켜줌
6-1. nodemon 실행시 오류
    => nodemon app.js
    => punycode 에러 발생 시
    => npm i punycode --save
    => node_modules/tr46/index.js
    => const punycode = require("punycode/"); (!! 후행 슬래시 추가 !!)