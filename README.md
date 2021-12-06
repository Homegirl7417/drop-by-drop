# 일거리 중개폼, 티끌

티끌 서비스의 프론트엔드입니다.

## 실행 방법1
Node 16 이하버전에서 실행하시길 권장합니다.
현재 로컬에서만 실행가능합니다.

### Step1. 해당 Git Repository를 Git Clone 또는 다운로드
### Step2. 터미널에서 'npm i' 실행
### Step3. 터미널에서 'npm start' 실행
일반적으로 'localhost:3000/drop-by-drop'페이지가 자동으로 실행되지만,

페이지가 뜨지 않을 경우 크롬 주소창에 입력해주세요.

## 실행 방법2
Node 17 이상 버전에서 실행시, 'npm start' 결과로 

'error:0308010C: digital envelope routines::unsupported' 에러가 반환될 수 있습니다.

아래 해결방안1대로 입력 후 'npm start'를 다시 시도해주세요.

해결이 안될 경우, 해결방안2대로 입력 후 'npm start'를 다시 시도해주세요.

이후로도 문제가 지속될 경우, hk7417@ajou.ac.kr로 문의바랍니다.

### 해결방안1
<img width="402" alt="Solution1 typing command in terminal" src="https://user-images.githubusercontent.com/52736242/144786769-9083abd6-57bc-4bcf-9896-b16f9e25e8ac.png">

### 해결방안2
<img width="561" alt="Solution2 change start in packageJson" src="https://user-images.githubusercontent.com/52736242/144787204-6aba2266-4d47-47a2-a72b-03d6f81435ce.png">

