import api from './';

export default async function postRequestWork(stepID) {
    try {
        return await putApi(stepID);
    } catch(err) {
        return false;
    }
}

const putApi = async (stepID) => {
    const { data: json } = await api.put(`/check/${stepID}`);
    if(json) return true;
}