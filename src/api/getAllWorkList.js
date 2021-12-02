import api from './';

export default async function getAllWorkList() {
    try {
        return await getApi();
    } catch(err) {
        return false;
    }
}

const getApi = async () => {
    const { data: json } = await api.get(`/works`);
    if(json) return json;
}