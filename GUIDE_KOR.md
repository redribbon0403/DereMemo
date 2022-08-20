# 가이드

## 시작하기 전에
본 프로그램은 인증받지 않은 비공식 프로그램으로 차후 불이익을 가져올 가능성이 있습니다. 이에 대한 책임은 모두 이용자 본인에게 있습니다.

## 계정 아카이브 하기
### 로그인
<img width="1392" alt="스크린샷 2022-08-16 오후 11 46 06" src="https://user-images.githubusercontent.com/111185111/184921100-ba0733a6-b843-4740-8b6b-6baef129cc3e.png">
처음 프로그램을 시작하면 다음과 같이 모바게에 로그인하는 페이지가 뜹니다. 자신의 게정으로 로그인해줍니다. (모바게 계정의 정보는 모두 로컬 컴퓨터에 저장되며 다른 곳으로 이동하지 않습니다.)  

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

## Github Pages를 통해 사이트 배포하기
![웹 캡처_20-8-2022_134010_desktop github com](https://user-images.githubusercontent.com/111185111/185730710-7537d84e-7086-49fb-87bd-2497d30a4f42.jpeg)
깃허브는 정적 파일에 한해 사이트의 무료 호스팅을 제공하고 있습니다. 이를 활용하기 위해 [깃허브](https://github.com/) 회원가입을 해줍니다. 
또한 작업을 할때 필요한 [깃허브 데스크탑을](https://desktop.github.com/) 설치해줍니다.
### 새로운 Repository(저장소) 생성
<img width="1302" alt="스크린샷 2022-08-20 오후 2 40 01" src="https://user-images.githubusercontent.com/111185111/185730887-5a97965f-191b-4fbe-b831-780f8b00ad7a.png">
회원가입을 완료했다면 프로필에서 새로운 저장소를 생성해야 합니다. 초록색 New 버튼을 클릭합니다.
<img width="752" alt="스크린샷 2022-08-20 오후 2 16 27" src="https://user-images.githubusercontent.com/111185111/185730917-bbf13dab-bc04-4d43-b346-f3f566c71112.png">
Repository name은 자신의 유저네임.github.io가 되어야합니다. 다른 설정은 건드리지 않은 상태로 Create Repository 버튼을 클릭합니다.

### 깃허브 데스크탑을 통한 파일 업로드
<img width="1072" alt="스크린샷 2022-08-20 오후 1 40 48" src="https://user-images.githubusercontent.com/111185111/185730988-edd21c61-d26a-4e57-bbc8-a47f63131a94.png">
깃허브 데스크탑을 처음 설치했다면 다음과 같은 화면이 보일 것입니다. Sign in to Github.com 버튼을 클릭해 로그인해줍니다.

<img width="1072" alt="스크린샷 2022-08-20 오후 1 44 41" src="https://user-images.githubusercontent.com/111185111/185731007-5a7b8825-fea7-44b9-bc3b-b13170a6eb52.png">
깃허브 데스크탑의 메인 화면입니다. Clone a Repository from the internet 버튼을 눌러 계정에 등록된 저장소 목록을 확인합니다.

<img width="1072" alt="스크린샷 2022-08-20 오후 2 16 52" src="https://user-images.githubusercontent.com/111185111/185731042-2a0f60f4-0006-474c-9a40-38747086a672.png">
방금 만들었던 유저네임.github.io 이름을 가진 저장소를 선택하고 Clone 버튼을 눌러줍니다.

<img width="1456" alt="스크린샷 2022-08-20 오후 2 17 49" src="https://user-images.githubusercontent.com/111185111/185731149-ccbf3757-8d53-472a-94be-857a67c6c115.png">
화면의 Show in Finder/Exploler 버튼을 눌러 저장소와 동기화 되는 폴더를 열어줍니다.

<img width="452" alt="스크린샷 2022-08-20 오후 2 18 19" src="https://user-images.githubusercontent.com/111185111/185731179-f8036610-60a2-4e4f-96dc-4f70f981dc78.png">
아직 어떤 파일도 업로드하지 않았기에 폴더의 내용물이 비어있습니다. 이곳에 위에서 작업한 폴더(mobamas pages)의 내용물을 복사해줍니다.

<img width="1456" alt="스크린샷 2022-08-20 오후 2 18 24" src="https://user-images.githubusercontent.com/111185111/185731261-72da2b93-8ffe-450d-a372-07971a4c8f83.png">

<img width="1456" alt="스크린샷 2022-08-20 오후 2 18 33" src="https://user-images.githubusercontent.com/111185111/185731333-893afdb9-4625-4c2c-a513-cd0f0f744af3.png">

다시 깃허브 데스크탑으로 돌아오면 새로운 파일을 자동으로 감지하고 변경 사항들이 추적됩니다. Summary에 적당한 내용을 써주고 Commit to main(또는 master) 버튼을 눌러줍니다. commit은 우리가 앞서 한 작업(파일을 업로드 또는 삭제, 수정한 행위)을 최종적으로 묶어 하나의 버전으로 만드는 행위입니다.

<img width="1456" alt="스크린샷 2022-08-20 오후 2 18 44" src="https://user-images.githubusercontent.com/111185111/185731444-a08f57f5-d60e-45a9-aff0-2c2f4b778a2b.png">

commit을 통해 변경 사항을 하나의 버전으로 만들었지만 실제 저장소에 반영하지는 않았습니다. Publish Branch를 눌러 온라인으로 버전을 배포해줍니다. 만약 이전에 commit을 했다면 Push Origin이라는 이름일 수 있습니다.

### 배포 확인하기

<img width="2534" alt="스크린샷 2022-08-20 오후 2 19 14" src="https://user-images.githubusercontent.com/111185111/185731570-99e95741-8466-4637-8047-b2b851961818.png">

깃허브의 저장소 페이지로 돌아가 파일이 정상적으로 올라갔는지 확인합니다. 문제가 없다면 깃허브가 자동으로 사이트를 생성하고 있을 것입니다.

<img width="2548" alt="스크린샷 2022-08-20 오후 2 19 40" src="https://user-images.githubusercontent.com/111185111/185731606-38aaa598-20f1-452d-8136-dedc5682f831.png">

저장소의 Actions 탭에서 페이지가 생성되고 있는 과정을 확인 할 수 있습니다.

<img width="1241" alt="스크린샷 2022-08-20 오후 3 15 16" src="https://user-images.githubusercontent.com/111185111/185731848-efcfd198-43f7-4cfc-87b5-af4444875c0e.png">

Actions의 작업이 초록색 체크표시로 전환된걸 확인하고 저장소 메인으로 돌아가면 Environments 영역에 github-pages가 추가된걸 볼 수 있습니다. 이 상태로 주소창에 유저네임.github.io을 입력하여 바로 접속하거나 github-pages를 눌러 배포 상태를 확인 할 수 있습니다.

<img width="1284" alt="스크린샷 2022-08-20 오후 3 15 25" src="https://user-images.githubusercontent.com/111185111/185731851-1e041a75-6330-4129-8c3a-1a20c3a3ec7f.png">

github-pages 링크를 누르면 다음과 같이 배포 상태가 나타납니다. View Deployment를 누르면 완성된 사이트로 바로 접속할 수 있습니다.

![1660926485](https://user-images.githubusercontent.com/111185111/185731908-75c4af32-774a-4ad6-aa5e-db398e52d476.png)

다음과 같이 사이트가 제대로 표시된다면 완료입니다.


그 외 배포에 관한 내용은 다음과 같은 게시물을 참고해주세요.
* [깃허브로 나만의 웹사이트 만들기](https://brunch.co.kr/@everiwon/42)
* [Visual Studio Code 라이브서버(Live Server) 설정하기](https://stajun.tistory.com/entry/Visual-Studio-Code-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EC%84%9C%EB%B2%84Live-Server-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

## 오류 발생 시
오류가 발생했을때는 해당 페이지의 Issues 탭을 이용하면 됩니다. 이때 프로그램의 로그를 첨부하면 대처가 쉬워집니다.  

로그파일 경로는 다음과 같습니다.
* on macOS: ~/Library/Logs/DereMemo
* on Windows: %USERPROFILE%\AppData\Roaming\DereMemo\logs
