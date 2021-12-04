export default (input) => {
    let currentCategory = '기타';
    switch (input){
        case 0: 
            currentCategory = '라벨링';
            break; 
        case 1:
            currentCategory = '설문조사';
            break;
        case 2:
            currentCategory = '심부름';
            break;
        case 3:
            currentCategory = '초안 번역';
            break; 
        case 4:
            currentCategory = '블로그 포스팅';
            break;                                   
        default:
            currentCategory = '기타';
            break; 
    }
    return currentCategory;
}