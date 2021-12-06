import api from './';

export default async function putLookOverAccept(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/lookover-accept/${workID}`);
    if(json) return true;
}