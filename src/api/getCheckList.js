import api from './';

export default async function getAllWorkList(workID) {
    try {
        return await getApi(workID);
    } catch(err) {
        return false;
    }
}

const getApi = async (workID) => {
    const { data: json } = await api.get(`/checklist/${workID}`);
    if(json) return json;
}