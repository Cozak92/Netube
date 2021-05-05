# Netube

Cloning Youtube with Vanilla JS and NodeJS

프론트엔드로 Vanilla JS, SaSS, ES6, WebPack, Pug 등을 사용하였고 백엔드로는 MongoDB, NodeJS, ES6, AWS 등을 사용했습니다.

유저 부분은 대부분 개발 완료했고 비디오 플레이어 쪽 부분만 남겨두고 있습니다.

https://stark-cove-41833.herokuapp.com/

* 수정해야될 부분

- 회원탈퇴 기능 구현    
- 코멘트 삭제 기능


## Pages:
- [x] Home  
- [x] Join  
	* 카카오와 깃허브 소셜로그인 구현
- [X] Login  
	* 구현완료
- [X] Seach  
	* 구현완료
- [X] User Detail  
	* 해당 프로필에서 해당 유저가 올린 비디오가 무엇인지 확인가능
- [X] Edit Profile  
	* 패스워드,아바타,이름,이메일 변경 가능
- [X] Change Password  
	* 구현완료
- [X] Video Upload  
	* AWS S3를 사용하여 완료
- [X] Video Detail  
	* 업로드한 사람만 비디오 지우거나 수정 할 수 있음  
	* 비디오 작성자 클릭시 비디오 작성한 사람 프로필로 이동  
	* fetch를 이용해 렌더링없이 views 증가 // 영상이 다 끝날때까지 시청시 view 증가  
	* 로그인 한 사람만 코멘트 쓸 수 있게 수정  
	* 자바스크립트로 비디오 플레이어 구현 완료  
- [X] Edit Video  
	* 제목,내용 수정 가능


