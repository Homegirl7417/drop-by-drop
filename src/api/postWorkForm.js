// export default async function postWorkForm(title, description, pay, category, dueDate) {
//     try {
//         console.log("작업등록 정보: ",title, description, pay, category, dueDate);
//         return await fetch(
//             `http://3.139.42.82:8081/work-form`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 title, 
//                 description, 
//                 pay, 
//                 category, 
//                 dueDate
//               }),
//             }
//           ).then(res => {
//               return res.status === 200 ? true : false;
//           })
//     } catch(err) {
//         return false;
//     }
// }
import api from './';

export default async function postWorkForm(title, description, pay, category, dueDate) {
    try {
        return await postApi(title, description, pay, category, dueDate);
    } catch(err) {
        return false;
    }
}

const postApi = async (title, description, pay, category, dueDate) => {
    console.log('작업 등록 API'+ title+ description+ pay+ category+ dueDate);
    const { data: json } = await api.post(`/work-form`, {
        title,
        description,
        pay,
        category,
        dueDate
    });
    if(json) return true;
}