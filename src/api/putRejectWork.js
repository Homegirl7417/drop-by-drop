import api from './';

export default async function postRequestWork(workID) {
    try {
        return await postApi(workID);
    } catch(err) {
        return false;
    }
}

const postApi = async (workID) => {
    const { data: json } = await api.put(`/refuse/${workID}`);
    if(json) return true;
}