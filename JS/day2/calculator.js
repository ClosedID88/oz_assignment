function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function inputFormula() {
    return prompt("계산식을 입력하세요.(예: 1 + 1 * 4)");
}

function calculate(formula) {
    // 1. 앞뒤 공백을 제거한 뒤, 공백(1개 이상) 기준으로 계산식 문자열을 토큰 배열로 분리
    // 예: "1 + 2 * 3 - 4" -> ["1", "+", "2", "*", "3", "-", "4"]
    const tokens = formula.trim().split(/\s+/);

    // 정상 수식은 [숫자, 연산자, 숫자, ...] 형태이므로 최소 3개 이상이고 개수가 홀수여야 함
    if (tokens.length < 3 || tokens.length % 2 === 0) {
        return "잘못된 계산식이 입력되었습니다.";
    }

    // 2. 1단계: 연산자 우선순위에 따라 곱셈(*)과 나눗셈(/)을 먼저 처리
    // 나머지 숫자 및 덧셈(+), 뺄셈(-)은 intermediateTokens 배열에 순서대로 보관
    const intermediateTokens = [];
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];

        if (token === "*" || token === "/") {
            // 직전에 넣어둔 왼쪽 피연산자를 꺼내 숫자로 변환
            const left = Number(intermediateTokens.pop());
            const operator = token;
            // 현재 연산자 바로 다음 토큰을 오른쪽 피연산자로 가져와 숫자로 변환
            const right = Number(tokens[i + 1]);

            // 피연산자 중 하나라도 숫자가 아니면 에러 반환
            if (isNaN(left) || isNaN(right)) return "잘못된 숫자가 입력되었습니다.";

            let res;
            if (operator === "*") {
                res = multiply(left, right);
            } else {
                // 0으로 나누는 경우 방지
                if (right === 0) return "0으로 나눌 수 없습니다.";
                res = divide(left, right);
            }

            // 계산된 중간 결과를 배열에 넣고, 이미 처리한 연산자와 오른쪽 피연산자는 건너뜀(+2)
            intermediateTokens.push(res);
            i += 2;
        } else {
            // 곱셈/나눗셈이 아니면 그대로 중간 배열에 추가하고 다음 토큰으로 이동
            intermediateTokens.push(token);
            i++;
        }
    }

    // 3. 2단계: 곱셈·나눗셈이 정리된 배열에서 덧셈(+)과 뺄셈(-)을 왼쪽부터 순서대로 계산
    let result = Number(intermediateTokens[0]);
    if (isNaN(result)) return "잘못된 숫자가 입력되었습니다.";

    // 홀수 인덱스(1, 3, 5...)에 연산자가 위치하므로 2칸씩 건너뛰며 순회
    for (let j = 1; j < intermediateTokens.length; j += 2) {
        const operator = intermediateTokens[j];
        const nextValue = Number(intermediateTokens[j + 1]);

        if (isNaN(nextValue)) return "잘못된 숫자가 입력되었습니다.";

        if (operator === "+") {
            result = add(result, nextValue);
        } else if (operator === "-") {
            result = subtract(result, nextValue);
        } else {
            return `예외 발생: ${operator}`;
        }
    }

    // 최종 계산 결과 반환
    return result;
}

function start(formula) {
    let input = formula;
    
    // 인자가 없으면 prompt로 물어봄
    if (!input) {
        input = inputFormula();
    }
    
    if (!input) {
        console.log("계산식을 입력해주세요.");
        return;
    }

    const result = calculate(input);
    if (typeof result === "string") {
        console.log(`에러 발생: ${result}`);
    } else {
        console.log(`결과: ${result}`);
    }
}