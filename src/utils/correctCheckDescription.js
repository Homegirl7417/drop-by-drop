export default (input, checkIndex) => {
    if (input === null || input === undefined || input.length === 0) {
        return '항목 없음은 완료 상태로 변경됩니다.';
    } else {
        return input[checkIndex].description;
    }
}