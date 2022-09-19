# Astro Chaser 웹페이지 만들기 프로젝트

한국항공대 천문관측 동아리 Astro Chaser의 웹페이지입니다. 

PC환경에 최적화되어 있으며, 모바일 환경은 열람 기능에 집중되어 있습니다.

[www.astrochaser.com](http://www.astrochaser.com)
## 참여

 - [BuzzingPolarBear](https://github.com/BUZZINGPolarBear)(전준휘)
	 - 기획, 프론트(html/css/js/jquery), 백엔드(Node.js + express), 클라우드(AWS) 
 - [yundididi](https://github.com/yundididi)(하윤지)
	 - 디자인

## 기능

 - 회원가입, 로그인 
 -  Access token, Refresh Token을 활용한 자동 로그인
 - 방명록 작성 
 - 공공데이터를 기반으로 한 천문 이벤트 달력, 동아리 활동 달력
 - 게시판 작성/조회/삭제 
 - 게시글 댓글, 대댓글 
 - 사진 게시판 작성/조회/삭제 기능

## 구조

 - 프론트
	 - html, css, js, jquery
	 - bulma
	 - full calendar
 - 백엔드
	 - Node.js + express
	 - mysql
	 - 공공데이터포탈 DB
 - 클라우드
	 - AWS
	 - ec2, rds, s3
	 - 가비아 DNS
