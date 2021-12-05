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
    if(json) {
        const deleteWorkID1 = json.filter(item => item.workID !== 1);
        return deleteWorkID1;
    }
}