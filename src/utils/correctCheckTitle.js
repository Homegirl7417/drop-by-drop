export default (input, checkIndex) => {
    if (input === null || input === undefined || input.length == 0 || input[0] === null) {
        return '체크 항목 없음';
    } else {
        return input[checkIndex].title;
    }
}