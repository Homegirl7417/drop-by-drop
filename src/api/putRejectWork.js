import api from './';

export default async function putRejectWork(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/refuse/${workID}`);
    if(json) return true;
}