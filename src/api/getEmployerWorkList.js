import api from './';

export default async function getEmployerWorkList() {
    try {
        return await getApi();
    } catch(err) {
        return false;
    }
}

const getApi = async () => {
    const { data: json } = await api.get(`/mywork-employer`);
    if(json) {
        const deleteWorkID1 = json.filter(item => item.workID !== 1);
        return deleteWorkID1;
    }
}