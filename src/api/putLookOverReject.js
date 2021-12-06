import api from './';

export default async function putLookOverReject(workID) {
    try {
        return await putApi(workID);
    } catch(err) {
        return false;
    }
}

const putApi = async (workID) => {
    const { data: json } = await api.put(`/lookover-refuse/${workID}`);
    if(json) return true;
}