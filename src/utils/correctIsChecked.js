export default (input, checkIndex) => {
    if (input === null || input === undefined || input.length === 0) {
        return true;
    } else {
        return input[checkIndex].checked;
    }
}