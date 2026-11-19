# 2) GitHub 협업

## (1) GitHub 기초

### GitHub

**개요**

- Git 저장소를 호스팅하는 서비스
- 계정을 만든 뒤 새 Repository를 생성하면 원격 저장소 주소(URL)가 발급

**원격 저장소**

- 인터넷에 있는 Git 저장소
- 여러 사람이 같은 코드 공유
- 소스 코드의 안전한 클라우드 백업 및 버전 관리
- 원활한 팀 프로젝트와 공동 작업
- 개발자 포트폴리오 및 오픈소스(Open Source) 생태계 참여
  - 오픈소스 : Python, Git, Linux, pytorch, numpy, sqlite, vscode

### 로컬과 원격 저장소

**git push / git pull**

- 로컬과 원격 저장소를 동기화하는 명령어
- GitHub, GitLab 등에 원격 저장소가 만들어져 있고, 로컬에 원격 주소가 등록(remote)되어 있어야 함

```bash
git remote add origin <저장소 링크>   # 현재 로컬 저장소에 원격 저장소 주소를 origin이라는 별칭으로 등록

git remote -v                         # 등록된 원격 저장소의 이름과 fetch/push용 URL을 함께 출력해
                                      # 연결이 잘 되었는지 확인
```

- `git push` : 로컬 커밋을 원격 저장소로 올림
- `git pull` : 원격 변경사항을 내려받아 로컬에 반영
  - pull : fetch (다운로드) + merge (병합)
  - Pull Request : 변경 사항을 원본 저장소에 반영해달라고 요청하는 것 (변경 내용 설명, 리뷰 요청, 병합 전 검증 단계)

```bash
git push -u origin main    # 로컬 커밋을 원격 저장소로 업로드

# GitHub 웹에서 파일 추가 & 커밋 생성

git pull origin main       # 원격 저장소의 변경사항 다운로드
```

**Clone**

- 원격 저장소에 있는 레포지토리를 처음 내 로컬에 동기화할 때 사용
- 원격 저장소를 그대로 내 로컬로 복사
- 같은 저장소에 push 권한이 있을 때 사용

**Fork**

- 다른 사람의 저장소를 내 GitHub 계정의 원격 저장소로 복사
- 원본 저장소에 직접 push 권한이 없을 때 사용
- 오픈소스 기여 방식

**Issues**

- 저장소(Repository) 내에서 버그 리포트, 기능 제안, 작업(Task) 관리, 팀 내 논의를 추적하는 프로젝트 관리 도구
- 담당자(Assignee), 라벨(Label), 타입(Type), 마일스톤(Milestone)으로 작업 성격과 일정 체계적 분류
- 커밋이나 PR에 `#이슈번호`를 참조해 코드 변경 이력과 작업 맥락을 자동으로 연결
- PR 본문에 `Closes #번호` 키워드 작성 시 병합(Merge)과 동시에 해당 이슈 자동 종료 처리

### README 생성

**GitHub에서 README.md 생성**

- README.md 파일 작성
- 생성한 README 파일에 대한 커밋 생성 (`Commit changes...` 버튼)
- 커밋 메시지 작성

**md 작성 가이드**

- Edit 탭에서 Markdown 작성 → Preview 탭에서 렌더링 결과 확인

## (2) 자주 사용하는 명령어

- `git show`
- `git diff`
- `git blame`
- `git stash`
- `git reset`
- `git revert`
- `git commit --amend`

---

# 5. HTML/CSS/Javascript

# 1) HTML/CSS

## (1) HTML 기초

### HTML(HyperText Markup Language)

**HTML 정의**

- 웹 페이지의 구조를 정의하는 언어
- 글의 제목, 문단, 이미지, 링크 같은 웹 페이지의 뼈대를 만드는 역할

**웹과 HTML**

- 서버가 HTML 문서를 만들어서 브라우저에 전달
- 브라우저는 HTML을 읽고 화면의 기본 구조를 그림
- 서버 → HTML 전달 → 브라우저 → 화면 구조 생성

### HTML 기본 구조

**HTML 문서는 항상 일정한 기본 틀을 가짐**

- 태그(tag)들의 조합으로 구성
- 태그는 `<태그이름>` 형태로 작성
- 각 태그마다 요소의 의미와 역할을 가짐
- 대부분의 태그는 여는 태그와 닫는 태그로 이루어짐
  - `<h1>제목</h1>`, `<p>문단 내용</p>`

**중첩 구조**

- 태그 안에 다른 태그가 들어갈 수 있으며, 이런 중첩 구조로 문서의 계층이 만들어짐
- 여러 단계의 중첩도 가능

**기본 코드**

- vscode 작업창에서 `!` 입력으로 자동 생성 가능

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문서 제목</title>
</head>
<body>
    <h1>제목</h1>
    <p>화면에 표시될 본문 내용입니다.</p>
</body>
</html>
```

**HTML 기본 코드의 핵심 구성 요소**

| 요소 | 내용 |
|---|---|
| `<!DOCTYPE html>` | HTML5 표준 문서임을 선언해 브라우저가 최신 렌더링 규칙으로 문서를 해석하도록 함 |
| `<html lang="ko">` | HTML 문서의 최상위 태그(모든 HTML 요소는 이 안에 포함)<br>lang 속성으로 문서 기본 언어 지정 |
| `<head>` | 화면에 직접 그려지지는 않지만, 문서 설정과 정보를 담는 영역<br>제목, 문자 인코딩, CSS, 메타 정보<br>`<meta charset="UTF-8">`: 한글과 특수문자 깨짐을 막기 위한 문자 인코딩 설정<br>`<meta name="viewport" content="width=device-width, initial-scale=1.0">`: 모바일 등 다양한 화면 크기에 맞춘 반응형 기준 설정 |
| `<title>My Page</title>` | 브라우저 탭에 표시되는 제목<br>검색 결과 제목으로도 사용 |
| `<body>` | 실제 웹페이지 화면에 렌더링되는 텍스트, 이미지, 버튼, 레이아웃 요소가 들어가는 영역 |

### 기본 태그

**기본 태그 목록**

| 태그 | 구분 | 핵심 역할 |
|---|---|---|
| `<p>` | Paragraph(문단), 블록 | 본문 문단 작성 |
| `<h1>`~`<h6>` | Heading(제목), 블록 | 계층적 제목 표시 |
| `<hr>` | Horizontal Rule(수평선), 빈 요소 | 구분선(주제 전환) 표시 |
| `<li>` | List Item(리스트), 목록 항목 | `<ul>` / `<ol>` 내 개별 항목 |
| `<table>` | Table(표), 표 | 행(`<tr>`)·열(`<th>`, `<td>`) 구조의 데이터 표 |
| `<img>` | Image(이미지), 빈 요소 | 이미지 표시(src, alt 필수 권장) |
| `<a>` | Anchor(앵커), 인라인 | 다른 페이지·위치로 이동하는 링크 |
| `<form>` | Form(입력양식), 블록 | 사용자 입력 요소 묶음 및 데이터 전송 |

**`<p>`, `<h#>`, `<hr>` 태그**

```html
<body>
    <h1>One</h1>
    Hello, HTML! <br>

    <h2>Two</h2>
    Hello, HTML! <br>
    Hello, HTML! <br>

    <hr>
    <h3>Three</h3>

    <!-- paragraph -->
    <p>Hello, HTML!</p>
    <p>Hello, HTML!</p>
    <p>Hello, HTML!</p>

    <h6>six</h6>
</body>
```

**`<li>` 태그**

- 순서 없는 목록(`<ul>`): 글머리 기호(점 등)가 붙는 항목 구성
- 순서 있는 목록(`<ol>`): 번호(1, 2, 3...)가 자동으로 붙는 항목 구성
  - 속성으로 번호 형태 변환 가능

```html
<body>
    <!-- Unordered List -->
    <ul>
        <li>Apple</li>
        <li>Banana</li>
        <li>Cherry</li>
    </ul>

    <!-- Ordered List -->
    <ol type="a">
        <li>Apple</li>
        <li>Banana</li>
        <li>Cherry</li>
    </ol>
</body>
```

**`<table>` 태그**

- `<table>`: 표 전체를 감싸는 최상위 컨테이너
- `<tr>` (Table Row): 표의 가로 한 행 구성
- `<th>` (Table Header): 행 또는 열의 제목 셀(기본 굵은 글씨, 가운데 정렬)
- `<td>` (Table Data): 실제 데이터가 들어가는 일반 셀

```html
<body>
    <table>
        <!-- 테이블 헤더 -->
        <thead>
            <tr>
                <th>ID</th>
                <th>이름</th>
                <th>나이</th>
            </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
            <tr>
                <td>1</td>
                <td>alex</td>
                <td>20</td>
            </tr>
            <tr>
                <td>2</td>
                <td>bob</td>
                <td>30</td>
            </tr>
            <tr>
                <td>3</td>
                <td>chris</td>
                <td>40</td>
            </tr>
        </tbody>
    </table>
</body>
```

**`<img>` 태그**

- Image(이미지)를 웹페이지에 삽입
- 빈 요소(Void element): 닫는 태그(`</img>`)를 쓰지 않음
- 텍스트 흐름에 맞춰 배치되며, 필요에 따라 CSS로 크기·여백·정렬 제어
- `<img src="images/sample.jpg" alt="샘플 이미지 설명">`
- src (Source): 불러올 이미지 파일의 경로 또는 URL 지정 (필수)
- alt (Alternative text): 이미지를 불러오지 못하거나 스크린 리더로 읽을 때 대신 보여줄 설명 텍스트 (접근성·SEO를 위해 권장)
- width / height: 이미지의 가로·세로 크기 지정 (단위 없이 숫자 입력 시 픽셀 px 기준, 레이아웃 흔들림 방지에 유리)

```html
<body>
    <img src="./대머리와 빛2.jpg" alt="painting">
</body>
```

**`<a>` 태그**

- 다른 페이지·문서 내 위치·파일·연락처 등으로 이동하는 하이퍼링크 생성
- href (Hypertext Reference): 이동할 목적지 경로 또는 주소 지정

```html
<body>
    <a href="https://www.google.com">구글</a>로 이동
</body>
```

**`<form>` 태그**

- 사용자의 입력값을 모아 지정된 주소로 전송하는 컨테이너

```html
<body>
    <form action="">
        <input type="password" placeholder="비밀번호 입력">
        <button>입력</button>
    </form>
    <form action="https://google.com/search">
        <input type="search" name="q" placeholder="검색어 입력">
        <button>입력</button>
    </form>
</body>
```
