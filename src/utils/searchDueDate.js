export default (input) => {
    let currentDueDate = '상시모집';
    switch (input){
        case null: 
            currentDueDate = '상시모집';
            break;                                  
        default:
            currentDueDate = input+' 마감';
            break; 
    }
    return currentDueDate; 
}