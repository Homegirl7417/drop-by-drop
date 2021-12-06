import api from './';

export default async function putAcceptWork(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/accept/${workID}`);
    if(json) return true;
}