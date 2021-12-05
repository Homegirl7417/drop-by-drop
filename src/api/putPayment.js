import api from './';

export default async function putPayment(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/payment/${workID}`);
    if(json) return true;
}