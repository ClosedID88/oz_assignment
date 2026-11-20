# HTML/CSS 학습자료 (p.29 ~ 63)

> 범위: id 속성 → 회원가입 폼 → 정규식 → class → div → Semantic → CSS 기초(인라인/내부/외부) → 셀렉터 → 우선순위 → 박스 모델 → 폰트·배경·여백 → 링크 스타일 → Font Awesome 아이콘

---

## id 속성

- 한 페이지에서 **유일한 식별자**
- 특정 요소 **하나를 정확히 지정**해야 할 때 사용
- 하나의 요소에만 사용

```html
<!-- 올바른 예 -->
<div id="header"></div>

<!-- 잘못된 예: 같은 id를 여러 요소에 사용 -->
<div id="header"></div>
<p id="header"></p>
```

- id 중복 시 브라우저가 에러를 내지는 않지만, CSS·JS가 의도대로 동작하지 않을 수 있음
  - `document.getElementById()`는 **첫 번째 요소만** 반환
- id의 주요 용도
  - `<label for="id">`와 input 연결
  - 페이지 내 이동 링크: `<a href="#header">위로</a>`
  - JavaScript에서 특정 요소 조작
- id 이름 규칙: 공백 불가, 숫자로 시작하지 않는 것을 권장, 대소문자 구분

---

## 회원가입 폼 구현

```html
<!-- $ code register.html -->
<form>
  <label for="email">Email</label>
  <input
    id="email" type="email" required
    placeholder="example@email.com"
  >
  <br>

  <label for="phone">Phone</label>
  <input
    id="phone" type="text" required
    placeholder="010-1234-5678"
  >
  <br>
  <button type="submit">Submit</button>
</form>
```

### 구성 요소 정리

| 요소/속성 | 역할 |
|---|---|
| `<form>` | 입력 데이터를 묶어 서버로 전송하는 영역 |
| `<label for="...">` | 입력창의 이름표, `for` 값 = 연결할 input의 `id` |
| `<input>` | 사용자 입력 칸 (닫는 태그 없음) |
| `type="email"` | 이메일 형식(@ 포함 등) 자동 검사 |
| `type="text"` | 일반 텍스트 입력 |
| `required` | 필수 입력, 비어 있으면 제출 불가 |
| `placeholder` | 입력 전 흐리게 보이는 예시 문구 |
| `<button type="submit">` | 폼 제출 버튼 |

- `label`과 `input`을 연결하면 **label 글자를 클릭해도 input에 포커스** → 사용성·접근성(스크린리더) 향상
- `for`/`id` 대신 감싸는 방식도 가능: `<label>Email <input type="email"></label>`
- 실무 폼의 주요 속성
  - `action`: 데이터를 보낼 URL / `method`: `GET` 또는 `POST`
  - `name`: 서버로 전송될 때의 키 이름 (**name이 없으면 값이 전송되지 않음**)
- 자주 쓰는 input type: `password`, `number`, `tel`, `date`, `checkbox`, `radio`, `file`
  - 전화번호는 `type="tel"` 사용 시 모바일에서 숫자 키패드가 뜸
- `<br>`은 줄바꿈용이지만, 레이아웃은 CSS로 잡는 것이 권장됨

---

## 정규식(regex)과 pattern 속성

### 정규식(Regular Expression)이란?

- 문자열의 **형식을 검사·검색·치환**하기 위한 규칙

### 주요 기호

| 기호 | 의미 | 기호 | 의미 |
|---|---|---|---|
| `.` | 아무 문자 1개 | `[]` | 문자 집합 (괄호 안 중 하나) |
| `*` | 0번 이상 반복 | `0-9` | 0부터 9까지 (`[]` 안에서 범위) |
| `+` | 1번 이상 반복 | `\d` | 숫자 1개 (`[0-9]`와 같음) |
| `?` | 0번 또는 1번 | `^` | 문자열의 시작 |
| `{n}` | 정확히 n번 반복 | `$` | 문자열의 끝 |

- 추가로 자주 쓰는 표현
  - `{n,m}`: n번 이상 m번 이하 / `{n,}`: n번 이상
  - `[a-z]`, `[A-Z]`: 알파벳 범위 / `[^0-9]`: 숫자가 **아닌** 것 (`[]` 안의 `^`는 부정)
  - `\w`: 영문·숫자·밑줄 / `\s`: 공백
  - `|`: 또는 (예: `010|011`) / `()`: 그룹
  - `\.`: 실제 마침표 문자 (특수기호 앞에 `\`를 붙여 이스케이프)

### HTML에 적용: pattern 속성

```html
<label for="phone">Phone</label>
<input
  id="phone" type="text" required
  placeholder="010-1234-5678"
  pattern="010-[0-9]{4}-[0-9]{4}"
  title="010-1234-5678 형식으로 입력하세요"
>
```

- `pattern`: 입력값이 정규식과 맞지 않으면 제출 차단
- `title`: 형식이 틀렸을 때 안내 메시지에 함께 표시
- 해석: `010-` + 숫자 4개 + `-` + 숫자 4개
- `pattern`은 자동으로 **전체 일치**로 검사됨 (앞뒤에 `^...$`가 붙은 것처럼 동작)
- 같은 표현을 `\d`로: `010-\d{4}-\d{4}`
- 국번 3~4자리 허용: `010-\d{3,4}-\d{4}`
- HTML 검사는 사용자가 개발자도구로 우회 가능 → **서버에서도 반드시 다시 검증**해야 함
- 정규식 연습 사이트: https://regexr.com/ , https://regex101.com/

---

## class 속성

- **공통된 특징**을 가진 요소들을 묶기 위한 속성
- 여러 요소에 **같은 이름으로 반복 사용 가능**

```html
<p class="text">Hello</p>
<p class="text">World</p>
```

- 왜 중요한가? → **class를 기준으로 CSS 스타일을 적용**하는 경우가 가장 많음
- 한 요소에 class 여러 개 지정 가능 (공백으로 구분)
  ```html
  <p class="text bold red">Hello</p>
  ```

### id vs class 비교

| 구분 | id | class |
|---|---|---|
| 중복 사용 | X 페이지에 1개 | O 여러 요소 가능 |
| 한 요소에 여러 개 | X | O |
| CSS 선택자 | `#이름` | `.이름` |
| 우선순위 | 높음 | 중간 |
| 주 용도 | 특정 요소 지정, label 연결, JS | 스타일 묶음 적용 |

---

## div 태그

- 요소들을 **하나로 묶는 컨테이너**
- 그 자체로는 의미가 없는 단순한 묶음 → 주로 class와 함께 사용

```html
<!-- $ code div.html -->
<div class="intro">
  <h1>What is HTML?</h1>
  <p>HTML is Hypertext Markup Language</p>
</div>
```

- `div`는 **블록(block) 요소**: 가로 전체를 차지하고 다음 요소는 새 줄에서 시작
- 인라인 버전의 묶음 태그는 `<span>` (줄 안에서 일부 글자만 묶을 때)

| 구분 | block 요소 | inline 요소 |
|---|---|---|
| 예시 | `div`, `p`, `h1`, `header`, `form` | `span`, `a`, `strong`, `label`, `img` |
| 줄바꿈 | 새 줄에서 시작 | 같은 줄에 이어짐 |
| width/height | 지정 가능 | 지정 불가 (내용 크기만큼) |

---

## Semantic HTML

- 태그 자체에 **‘의미’를 담는 것**
- 코드가 무엇을 의미하는지 드러내는 HTML 작성 방식
  - `div`: 의미 없음, 단순한 묶음
  - `p`: 문단
  - `header`, `main`, `footer`: 역할이 명확 (상단 영역, 핵심 콘텐츠, 하단 정보)

- 시맨틱 태그를 쓰는 이유
  - **가독성**: 코드만 봐도 구조 파악 가능
  - **접근성**: 스크린리더가 페이지 구조를 이해
  - **SEO**: 검색엔진이 핵심 콘텐츠를 더 잘 파악
- 그 외 주요 시맨틱 태그

| 태그 | 의미 |
|---|---|
| `<nav>` | 내비게이션(메뉴) 링크 영역 |
| `<section>` | 주제별 구역 |
| `<article>` | 독립적인 콘텐츠 (블로그 글, 뉴스 기사) |
| `<aside>` | 부가 정보 (사이드바) |

- `<main>`은 페이지에 **한 번만** 사용하는 것이 원칙

---

## CSS(Cascading Style Sheets)란?

- HTML 요소의 **모양과 배치**를 정하는 언어
  - 글자 색, 크기, 폰트
  - 여백, 정렬, 위치
  - 레이아웃 (Flex, Grid): 화면에 요소를 어떻게 배치할지
  - 반응형 디자인: 화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인
- 역할 분담: **HTML = 구조(뼈대)**, **CSS = 표현(디자인)**, **JavaScript = 동작**
- Cascading(폭포처럼 흐르는) 의미
  - 여러 규칙이 겹칠 때 **우선순위·순서**에 따라 최종 스타일이 결정됨
  - 부모의 일부 스타일(글자색, 폰트 등)이 자식에게 **상속**됨

---

## CSS 적용 방법 3가지

### 인라인 스타일 (Inline style)

- 태그의 `style` 속성에 직접 작성

```html
<!-- $ code resume.html -->
<body>
  <p>Dong-hyeon Shin</p>
  <p>Backend Engineer in Seoul</p>
  <p>Copyright &#169; Dong-hyeon Shin</p>
</body>
```

- `&#169;` → © 기호 (HTML 엔티티)
  - `&copy;`로도 표기 가능 / 그 외 `&lt;`(<), `&gt;`(>), `&amp;`(&), `&nbsp;`(공백)

**① font-size & font-weight**
```html
<p style="font-size: x-large; font-weight: bold;">Dong-hyeon Shin</p>
<p style="font-size: medium;">Backend Engineer in Seoul</p>
<p style="font-size: xx-small;">Copyright &#169; Dong-hyeon Shin</p>
```

**② text-align**
```html
<p style="font-size: x-large; font-weight: bold; text-align: center;">Dong-hyeon Shin</p>
```

**③ 공통 스타일 적용** → 부모 div에 한 번만 지정하면 자식에게 상속
```html
<div style="text-align: center;">
  <p style="font-size: x-large; font-weight: bold;">Dong-hyeon Shin</p>
  <p style="font-size: medium;">Backend Engineer in Seoul</p>
  <p style="font-size: xx-small;">Copyright &#169; Dong-hyeon Shin</p>
</div>
```

**④ Semantic HTML로 변경**
```html
<header style="font-size: x-large; font-weight: bold;">Dong-hyeon Shin</header>
<main style="font-size: medium;">Backend Engineer in Seoul</main>
<footer style="font-size: xx-small;">Copyright &#169; Dong-hyeon Shin</footer>
```

- 인라인 스타일의 단점: 재사용 불가, 코드가 길어짐, 유지보수 어려움, 우선순위가 너무 높아 덮어쓰기 힘듦 → 테스트용 외에는 지양

### 내부 스타일 시트 (Internal CSS)

- `<head>` 안의 `<style>` 태그에 작성
- 기본 구조: `selector { property: value; }`

```html
<head>
  <style>
    p { color: red; }
  </style>
</head>
```

```html
<style>
  div    { text-align: center; }
  header { font-size: x-large; font-weight: bold; }
  main   { font-size: medium; }
  footer { font-size: xx-small; }
</style>
```

- 문법 용어: `p` = 선택자, `color` = 속성(property), `red` = 값(value), `color: red;` = 선언(declaration)
- 선언 끝에 `;`를 빠뜨리면 다음 선언까지 무시될 수 있음

### 외부 스타일 시트 (External CSS)

- **별도의 CSS 파일로 분리**해서 관리
- `<head>` 안에 `<link>`로 연결

```html
<link rel="stylesheet" href="style.css">
```

- 장점: 여러 HTML 페이지가 같은 CSS 공유, 브라우저 캐싱으로 속도 향상, 구조와 디자인 분리
- `.css` 파일 안에는 `<style>` 태그 없이 규칙만 작성

### 세 방식 비교

| 방식 | 위치 | 재사용성 | 우선순위 | 권장도 |
|---|---|---|---|---|
| 인라인 | 태그의 `style` | 없음 | 가장 높음 | 낮음 |
| 내부 | `<head>`의 `<style>` | 해당 페이지만 | 순서에 따름 | 보통 |
| 외부 | `.css` 파일 | 여러 페이지 | 순서에 따름 | **높음 (실무 표준)** |

---

## 셀렉터(Selectors)

- **어떤 HTML 요소에 스타일을 적용할지** 지정하는 규칙

### 기본 셀렉터

| 셀렉터 | 문법 | 예 |
|---|---|---|
| 전체 | `*` | `* { margin: 0; }` |
| 태그 | `태그명` | `div { }` |
| 클래스 | `.클래스명` | `.text { }` |
| ID | `#아이디` | `#header { }` |

- 그룹 셀렉터: 쉼표로 여러 개 동시 지정 → `h1, h2, p { color: gray; }`
- 결합: `p.text` → class가 text인 **p 태그만** (띄어쓰지 않음)

### 결합자(관계) 셀렉터

| 이름 | 문법 | 선택 대상 |
|---|---|---|
| 자손 | `div p` | div 안의 **모든** p (깊이 상관없음) |
| 자식 | `div > p` | div **바로 아래** 자식 p만 |
| 인접 형제 | `div + p` | div **바로 다음**에 오는 p 하나 |
| 일반 형제 | `div ~ p` | div **뒤에 오는 모든** 형제 p |

```html
<div>
  <p>A</p>          <!-- div p O / div > p O -->
  <section>
    <p>B</p>        <!-- div p O / div > p X -->
  </section>
</div>
<p>C</p>            <!-- div + p O / div ~ p O -->
<p>D</p>            <!-- div + p X / div ~ p O -->
```

### 속성 셀렉터

- `a[href]`: href 속성을 **가진** a 태그
- `input[type="text"]`: type 속성이 **"text"인** input 태그
- 추가 문법: `[href^="https"]`(~로 시작), `[href$=".pdf"]`(~로 끝남), `[class*="btn"]`(~를 포함)

### 가상 클래스 셀렉터 (Pseudo-class)

- 요소의 **상태**를 기준으로 선택

| 가상 클래스 | 의미 |
|---|---|
| `:hover` | 마우스를 요소 위에 올렸을 때 |
| `:focus` | 요소가 포커스를 가졌을 때 (input 클릭, Tab 이동) |
| `:active` | 요소를 클릭하고 있는 순간 |
| `:nth-child(n)` | 부모 기준 n번째 자식 |

- `:nth-child()` 활용: `(2)` 2번째, `(odd)` 홀수, `(even)` 짝수, `(3n)` 3의 배수
- 그 외: `:first-child`, `:last-child`, `:not(.class)`
- 폼 관련 가상 클래스: `:invalid`, `:valid`, `:required` → 위 pattern 검사와 함께 쓰면 좋음
  ```css
  input:invalid { border-color: red; }
  ```
- **가상 요소(Pseudo-element)**는 콜론 2개(`::`): `::before`, `::after`, `::placeholder` → 요소의 특정 부분을 선택하거나 내용을 추가

### 셀렉터 연습

- **CSS Diner**: 다양한 셀렉터를 게임처럼 연습하는 사이트
  - https://flukeout.github.io/

---

## 셀렉터 우선순위

- 높은 순서 (위가 가장 강함)
  1. `!important`
  2. 인라인 스타일 (`style=""`)
  3. id 선택자 (`#id`)
  4. class / 속성 / 가상 클래스 (`.class`, `[type]`, `:hover`)
  5. 태그 선택자 (`div`, `p`)
  6. 전체 선택자 (`*`)
- **id > class > tag**, 우선순위가 같으면 **나중에 작성된 코드가 승리**

- 명시도(Specificity) 점수 계산: (id 개수, class·속성·가상클래스 개수, 태그 개수)
  - `p` → (0, 0, 1)
  - `.text` → (0, 1, 0)
  - `div .text` → (0, 1, 1)
  - `#header .menu a` → (1, 1, 1)
  - 앞자리부터 비교 → class가 아무리 많아도 id 1개를 이길 수 없음
- `!important`는 우선순위 꼬임의 주범 → 최소한으로 사용
- 상속된 스타일은 직접 지정된 스타일보다 항상 약함

---

## CSS 박스 모델

- 모든 HTML 요소를 **‘사각형 박스’**로 보고 크기와 여백을 계산하는 규칙
- 안쪽부터 4가지 요소

```
┌──────────── margin (바깥 여백, 투명) ────────────┐
│  ┌──────────── border (테두리) ──────────────┐  │
│  │  ┌───────── padding (안쪽 여백) ───────┐  │  │
│  │  │           content (내용)           │  │  │
│  │  └────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

| 요소 | 설명 |
|---|---|
| content | 실제 내용(글자, 이미지) 영역 |
| padding | 내용과 테두리 사이 여백, **배경색이 칠해짐** |
| border | 테두리 |
| margin | 다른 요소와의 바깥 간격, **배경색 없음(투명)** |

### 예제

```html
<div class="wrapper">
  <div class="box">BOX</div>
</div>
```

```css
.wrapper {
  background: orange;
  border: 5px dotted black;
}
.box {
  margin: 20px;
  border: 5px solid black;
  padding: 50px;
  width: 100px;
  background-color: skyblue;
}
```

### 실제 화면에서 차지하는 크기

- 가로: 100(width) + 50×2(padding) + 5×2(border) = **210px**
- width를 100으로 기대했지만 실제는 210 → **width는 content만의 크기**
- 기본값: `box-sizing: content-box;`
- margin(20×2)까지 포함하면 공간상 차지하는 너비는 250px

### box-sizing: border-box

- 전체 요소와 가상 요소까지 동일한 박스 모델 기준으로 계산되도록 변경

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

- `border-box` 적용 시 **width = content + padding + border**
  - 위 예제는 전체 너비가 정확히 100px이 되고, content가 100 − 100 − 10 = 0px로 줄어듦
- 실무에서는 대부분 CSS 파일 맨 위에 이 코드를 넣고 시작 (크기 계산이 직관적)

| 구분 | content-box (기본) | border-box |
|---|---|---|
| width에 포함 | content만 | content + padding + border |
| 위 예제 실제 너비 | 210px | 100px |

---

## 자주 쓰는 스타일 속성

### background-color

```css
header { font-size: x-large; font-weight: bold; background-color: red; }
main   { font-size: medium; background-color: green; }
footer { font-size: xx-small; background-color: yellow; }
```

- 색상 표기법: 이름(`red`), HEX(`#ff0000`, 축약 `#f00`), `rgb(255, 0, 0)`, 투명도 포함 `rgba(255, 0, 0, 0.5)`
- `background`는 색·이미지·위치 등을 한 번에 쓰는 단축 속성

### margin & border & padding

```css
header {
  /* … */
  margin-top: 20px;
  border: 2px solid blue;
}
main {
  /* … */
  padding: 50px;
}
```

- `border` 단축 속성: `두께 스타일 색상` (예: `2px solid blue`)
  - 스타일 종류: `solid`(실선), `dotted`(점선), `dashed`(파선), `double`(이중선), `none`
- 방향별 지정: `-top`, `-right`, `-bottom`, `-left`
- 값 개수에 따른 단축 표기 (**시계 방향: 위 → 오른쪽 → 아래 → 왼쪽**)

| 표기 | 의미 |
|---|---|
| `margin: 10px;` | 상하좌우 10 |
| `margin: 10px 20px;` | 상하 10 / 좌우 20 |
| `margin: 10px 20px 30px;` | 위 10 / 좌우 20 / 아래 30 |
| `margin: 10px 20px 30px 40px;` | 위 / 오른쪽 / 아래 / 왼쪽 |

- `margin: 0 auto;` + width 지정 → 블록 요소를 **가로 가운데 정렬**
- **마진 상쇄(margin collapse)**: 위아래로 붙은 두 요소의 세로 margin은 더해지지 않고 **큰 값 하나만 적용**됨
- 브라우저가 `body`, `p`, `h1` 등에 기본 margin을 넣어둠 → 초기화 시 `* { margin: 0; padding: 0; }`

### font-family

```css
header {
  font-family: 'Times New Roman', Times, serif;
}
```

- 앞에서부터 순서대로 시도, 없으면 다음 글꼴로 대체(fallback)
- 이름에 공백이 있으면 따옴표로 감싸기 (`'Times New Roman'`)
- 마지막은 반드시 **일반 글꼴 계열**로 마무리: `serif`(삐침 있음), `sans-serif`(삐침 없음), `monospace`(고정폭)
- 한글 웹폰트는 Google Fonts(Noto Sans KR 등)나 Pretendard를 많이 사용

### font (단축 속성)

- 순서: `font-weight` → `font-size` → `font-family`
- **font-size와 font-family는 반드시 포함**해야 함

```css
header {
  font: bold x-large 'Times New Roman', Times, serif;
}
```

- 전체 순서: `font-style font-variant font-weight font-size/line-height font-family`
  - 예: `font: italic bold 16px/1.5 sans-serif;`
- 단축 속성은 생략된 값을 기본값으로 **초기화**하므로 주의

### 크기 단위 정리

| 단위 | 기준 | 비고 |
|---|---|---|
| 키워드 | `xx-small` ~ `xx-large` | 자료에서 사용, 기본 `medium` ≈ 16px |
| `px` | 고정 픽셀 | 가장 직관적 |
| `%` | 부모 요소 기준 | |
| `em` | 부모(자신)의 font-size 기준 | 중첩 시 누적됨 |
| `rem` | 최상위(html) font-size 기준 | **실무에서 글자 크기에 권장** |
| `vw` / `vh` | 화면 너비/높이의 1% | 반응형에 활용 |

- `font-weight`: `normal`(400), `bold`(700), 또는 100~900 숫자

---

## 링크(a 태그) 스타일링

### a 태그 추가

```html
<a class="github-link" href="https://github.com/qu3vipon">My GitHub</a>
```

```css
.github-link {
  font-size: small;
  color: gray;
  text-decoration: none;       /* 기본 밑줄 제거 */
}
.github-link:hover {
  text-decoration: underline;  /* 마우스 올리면 밑줄 */
}
```

- `text-decoration`: 밑줄 등 글자 장식 (`none`, `underline`, `line-through`)
- `:hover`로 마우스 반응 효과 부여
- 새 탭에서 열기: `target="_blank"` + 보안상 `rel="noopener noreferrer"` 함께 사용
- 링크 가상 클래스 작성 순서 **LVHA**: `:link` → `:visited` → `:hover` → `:active` (순서가 틀리면 덮어써짐)
- `cursor: pointer;` → 마우스 커서를 손가락 모양으로

---

## Font Awesome 아이콘

- 웹에서 쓰는 **아이콘을 글꼴처럼** 제공하는 라이브러리
  - https://fontawesome.com/
- 글꼴처럼 취급 → `color`, `font-size`로 색·크기 조절 가능

### CDN으로 불러오기 (`<head>` 안)

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
/>
```

### GitHub 아이콘 추가

```html
<a class="github-link" href="https://github.com/qu3vipon">
  <i class="fa-brands fa-github"></i>GitHub
</a>
```

- `fa-brands`: 브랜드 아이콘 스타일 / `fa-github`: 아이콘 이름
- 아이콘 스타일 종류: `fa-solid`(채움), `fa-regular`(외곽선), `fa-brands`(브랜드 로고)
- 아이콘과 글자 사이 간격: `.github-link i { margin-right: 4px; }`
- 크기 조절 클래스: `fa-lg`, `fa-2x`, `fa-3x` 등
- **CDN**(Content Delivery Network): 파일을 직접 다운로드하지 않고 외부 서버에서 불러오는 방식 → 인터넷 연결 필요
- 장식용 아이콘은 `aria-hidden="true"`를 붙여 스크린리더가 읽지 않게 하는 것이 좋음
- `<i>`는 원래 이탤릭 태그지만, 관례적으로 아이콘에 사용

---

## 핵심 요약 체크리스트

- [ ] id는 **유일**, class는 **반복 가능** → CSS에서 `#id`, `.class`
- [ ] `label`의 `for` = `input`의 `id`로 연결
- [ ] `required`, `type="email"`, `pattern`으로 브라우저 입력 검사 (서버 검증도 필수)
- [ ] 정규식 `010-[0-9]{4}-[0-9]{4}` 해석 가능
- [ ] `div`는 의미 없는 묶음, `header`/`main`/`footer`는 시맨틱 태그
- [ ] CSS 적용 3가지: 인라인 < 내부 < **외부(권장)**
- [ ] 기본 구조 `selector { property: value; }`
- [ ] 결합자 4종: 자손(공백), 자식(`>`), 인접 형제(`+`), 일반 형제(`~`)
- [ ] 가상 클래스: `:hover`, `:focus`, `:active`, `:nth-child()`
- [ ] 우선순위: `!important` > 인라인 > id > class > tag > `*`, 같으면 나중 코드
- [ ] 박스 모델: content → padding → border → margin
- [ ] content-box에서 실제 너비 = width + padding×2 + border×2
- [ ] `box-sizing: border-box`로 계산을 직관적으로
- [ ] `font` 단축 속성에는 size와 family 필수
- [ ] Font Awesome은 CDN `<link>` + `<i class="fa-brands fa-github">`
