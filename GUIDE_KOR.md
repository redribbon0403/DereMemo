# 가이드

## 시작하기 전에
본 프로그램은 인증받지 않은 비공식 프로그램으로 차후 불이익을 가져올 가능성이 있습니다. 이에 대한 책임은 모두 이용자 본인에게 있습니다.

## 계정 아카이브 하기
### 로그인
<img width="1392" alt="스크린샷 2022-08-16 오후 11 46 06" src="https://user-images.githubusercontent.com/111185111/184921100-ba0733a6-b843-4740-8b6b-6baef129cc3e.png">
처음 프로그램을 시작하면 다음과 같이 모바게에 로그인하는 페이지가 뜹니다. 자신의 게정으로 로그인해줍니다. (모바게 계정의 정보는 모두 로컬 컴퓨터에 저장되며 다른곳으로 이동하지 않습니다.)  

로그인 이후에는 프로그램이 자동으로 모바마스 메인페이지에 진입하여 새로고침을 합니다. 이는 로그인 보너스와 같은 각종 리다이렉션에 의한 오류를 방지하기 위함입니다.

### 갤러리 정보 입력
<img width="1284" alt="스크린샷 2022-08-14 오전 12 24 07" src="https://user-images.githubusercontent.com/111185111/184921519-685fa63a-460e-4011-835d-cba4571fb197.png">
메인페이지에 진입했다면 아카이브하고 싶은 아이돌 갤러리의 ID를 추가해야합니다.
이때 ID는 모바마스 아이돌 갤러리 URL의 끝 부분에 있는 값입니다.
<img width="876" alt="스크린샷 2022-08-16 오후 11 55 04" src="https://user-images.githubusercontent.com/111185111/184921779-50158709-c882-437f-a0aa-f50cc7ef20c7.png">
모든 ID를 입력했다면 다운로드 될 폴더를 정하고 START ARCHIVING 버튼을 누르고 대기합니다.

### 파일 확인하기
<img width="120" alt="스크린샷 2022-08-17 오전 12 03 12" src="https://user-images.githubusercontent.com/111185111/184922283-c48f4a59-5ac3-452f-bdf6-adef685d381e.png">
<img width="327" alt="스크린샷 2022-08-17 오전 12 15 05" src="https://user-images.githubusercontent.com/111185111/184922294-3e3a9cd5-000d-4e12-b7a0-baac5d0ab333.png">
정상적으로 작업이 완료됐다면 지정된 폴더에 다음과 같은 데이터가 있을 것입니다.  
이 파일을 Github Pages와 같은 호스팅 서비스에 배포하거나 VSCODE의 Live Server 기능을 사용해 로컬에서 확인할 수 있습니다.  

작업이 완료된 파일을 사용하는 방법은 다음과 같은 게시물을 참고해주세요.
* [깃허브로 나만의 웹사이트 만들기](https://brunch.co.kr/@everiwon/42)
* [Visual Studio Code 라이브서버(Live Server) 설정하기](https://stajun.tistory.com/entry/Visual-Studio-Code-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EC%84%9C%EB%B2%84Live-Server-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

## 오류 발생 시
오류가 발생했을때는 해당 페이지의 Issues 탭을 사용하면 됩니다. 이때 프로그램의 로그를 첨부하면 훨씬 대처가 쉬워집니다.  

로그파일 경로는 다음과 같습니다.
* on macOS: ~/Library/Logs/DereMemo
* on Windows: %USERPROFILE%\AppData\Roaming\DereMemo\logs
