# Http 모듈로 서버 만들기

## 서버와 클라이언트 
![image](https://user-images.githubusercontent.com/68223593/128681713-19a2fd4d-869d-4f71-a2e5-23e2193c9a46.png)  
클라이언트가 요청을 보내면 서버는 요청에 맞는 응답을 보내줌  
클라이언트는 쉽게 생각해 사용자라고 보면 된다. (앱,웹)  
서버는 클라이언트가 요청을 보내면 알맞는 페이지를 보여주고, DB 에 접근하여 정보를 보여준다.   
DB 에 접근할때는 클라이언트에서 바로 접근하지 않고 서버를 거쳐서 접근한다.

## HTTP(Hyper Text Transfer Protocol) 프로토콜
클라이언트가 요청할때만 서버에서 응답해주는 단방향 통신  
요청을하면 응답을 보내주고 연결이 끊김 (비연결성 프로토콜)  
기본적으로 요청내용을 기억하지 않기때문에 쿠기,세션등을 이용  
서버에서 클라이언트로 요청을 보낼수는 없음  
(stateless)상태가 없는 프로토콜 

## HTTP 구조
크게 헤더와 바디로 나뉜다.  
### http 헤더 
클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송  
헤더는 키 값 형태로 이루어짐 (key:value)]
 General 헤더 : 전체 메시지에 적용되는 헤더
- Request/Response 헤더 : 요청이나 응답시 포함된 헤더
- Entity 헤더 : 메시지 바디의 컨텐츠를 나타내는요청 및 응답 모두에서 사용됩니다. Content-Length, Content-Language, Content-Encoding과 같은 헤더는 엔티티 헤더입니다.  
![image](https://user-images.githubusercontent.com/68223593/128700052-28fd803d-04df-4caa-b6df-1548eda5a5bf.png)  
① start line : http 프로토콜은 요청이나 응답에 항상 start line 으로 시작함, 요청할때는 서버에서 해야될 작업을 적고
응답할때는 작업에 대한 결과를 리턴한다.  
ex) start line 예시

|요청|응답|
|---|---|
|GET / HTTP/1.1|HTTP/1.1 200 OK|

- method : 서버에 어떤 요청을 수행하기 위한 메서드, get,post,delete,patch,update 등 다양한 메서드가 있음
  * get : 특정 리소스를 표시, 데이터를 받기만 함, 다른메서드와 다르게 쿼리스트링으로 값을 전달
  * post : 보통 특정 리소스를 작성, 파일전송 등에 사용 데이터를 바디에 담아 서버에 전송
  * delete : 특정 리소르를 삭제
  * patch : 특정 리소스를 수정
  * put : 전체 리소를 수정  
📢 delete 나 patch, put 같은경우는 restful API 에서 저렇게 사용하자 약속한거 뿐이지 절대 저 기능만 수행하는건 아님, get,post 만써도 구현가능 📢 
- url : 서버에 자원을 요청하기 위해 입력하는 영문 주소 요청헤더에서는 path 만 표시함
- http 버전 : 요청과 응답에 포함되있음 [http 버전 역사](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP) 표준은 1.1
- 응답코드 : 클라이언트가 요청하고 결과를 알려주는 코드 3자리 숫자로 이루어짐
![image](https://user-images.githubusercontent.com/68223593/128703677-e2dac704-80c5-4587-9332-1be54bc12ce3.png)
* HTTP 요청 헤더
![image](https://user-images.githubusercontent.com/68223593/128703938-919f23f6-85e6-4f0d-949f-37691225530a.png)
* HTTP 응답 해더  
![image](https://user-images.githubusercontent.com/68223593/128683773-e43b8e43-d6e7-4aa8-8f04-b0c4fd022fbf.png) 
### http body 본문
본문은 응답의 마지막 부분에 들어감
모든 응답에 본문이 들어가지는 않음. 
201, 204과 같은 상태 코드를 가진 응답에는 보통 본문이 있음

### port 번호 
프로세스를 구분짓기 위한 16비트의 논리적 할당 (0~65536)
> 포트번호를 쓰는이유  
> 파일전송, http, mysql 등 여러기능을 하나의 ip 주소에 요청할시  
> 충돌이 나기 때문에 프로세스 구분을 위해 사용함

포트번호 :
0 ~ 1023 번 : Well Known Port 일반적인 웹서버,메일서버등의 서버가 요청 대기  
1024 ~ 49151 번 :Registered Port 제조업체의 독자적인 서버가 요청 대기할때      
49152 ~ 65535 번 : Dynamic Port 서버가 클라이언트를 식별하기 위해 사용  

[대표적인 포트번호](https://ko.wikipedia.org/wiki/TCP/UDP%EC%9D%98_%ED%8F%AC%ED%8A%B8_%EB%AA%A9%EB%A1%9D) : http(20),https(443),mysql(3306),ftp(22),mongodb(27017)

## 쿠키
서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각   
브라우저는 데이터 저장, 동일한 서버에 재 요청 시 저장된 데이터를 함께 전송  
두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단(자동로그인)  
상태가 없는(stateless) HTTP 프로토콜에서 상태 정보를 기억  
![image](https://user-images.githubusercontent.com/68223593/129431359-7aeb9003-8ffc-4987-bd91-4e7a5671a9de.png)

### 쿠키의 사용 목적
* 세션 관리(Session management)  
서버에 저장해야 할 로그인, 장바구니, 게임 스코어 등의 정보 관리
* 개인화(Personalization)  
사용자 선호, 테마 등의 세팅
* 트래킹(Tracking)  
사용자 행동을 기록하고 분석하는 용도

## 세션
![image](https://user-images.githubusercontent.com/68223593/129431394-8e76be35-9b32-46fb-bf38-b428b68f666b.png)
브라우저가 종료되기 전까지 클라이언트의 요청을 유지하게 해주는 기술입니다.
세션은 쿠키를 기반하고 있지만, 사용자 정보 파일을 브라우저에 저장하는 쿠키와 달리 세션은 서버 측에서 관리합니다.
서버에서는 클라이언트를 구분하기 위해 세션 ID를 부여하며 웹 브라우저가 서버에 접속해서 브라우저를 종료할 때까지 인증상태를 유지합니다.
사용자에 대한 정보를 서버에 두기 때문에 쿠키보다 보안에 좋지만, 사용자가 많아질수록 서버 메모리를 많이 차지하게 됩니다.


## https란?

Http 프토토콜의 문제점
서버에서 브라우저로 전송되는 정보가 암호화되자 않음(보안적 문제)

### https 특징
- SSL(보안 소켓 계층)을 사용해 서버와 브라우저 사이의 암호화된 연결
- 정보 도난 막아줌
- 검색엔진 최적화
- webRTC 사용할때 필수로 필요함
![image](https://user-images.githubusercontent.com/68223593/129432615-07e186c7-cc8c-48db-b713-95ca395a60a9.png)




### 참고
[web 기본개념](https://medium.com/@lidiach217/web-%EA%B8%B0%EB%B3%B8%EA%B0%9C%EB%85%90-http-%ED%86%B5%EC%8B%A0-cf5f89906c8e)  
[HTTP 통신 개념](https://velog.io/@doomchit_3/Internet-HTTP-%EA%B0%9C%EB%85%90%EC%B0%A8%EB%A0%B7-IMBETPY)  
[MDN 공식문서 HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)  
[정보통신 용어 기술 설명](http://www.ktword.co.kr/test/view/view.php?m_temp1=4884)  
[http 헤더와 바디](https://blueyikim.tistory.com/1999)  
[포트번호란?](https://it-sungwoo.tistory.com/128)  
[포트번호란?](https://alsrbdmsco0409.tistory.com/200)  
[http 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)  
[쿠키 세션이란?](https://chrisjune-13837.medium.com/web-%EC%BF%A0%ED%82%A4-%EC%84%B8%EC%85%98%EC%9D%B4%EB%9E%80-aa6bcb327582)
[쿠키 세션 개념](https://interconnection.tistory.com/74)
[Https 와 http 차이점](https://brunch.co.kr/@hyoi0303/10)
