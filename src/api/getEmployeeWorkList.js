import api from './';

export default async function getEmployerWorkList() {
    try {
        return await getApi();
    } catch(err) {
        return false;
    }
}

const getApi = async () => {
    const { data: json } = await api.get(`/mywork-employee`);
    if(json) return json;
}