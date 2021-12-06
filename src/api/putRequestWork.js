import api from './';

export default async function putRequestWork(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/request/${workID}`);
    if(json) return true;
}