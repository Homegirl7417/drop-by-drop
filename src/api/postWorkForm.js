import api from './';

export default async function postWorkForm(title, description, pay, category, dueDate, checkList) {
    try {
        return await postApi(title, description, pay, category, dueDate, checkList);
    } catch(err) {
        return false;
    }
}

const postApi = async (title, description, pay, category, dueDate, checkList) => {
    const { data: json } = await api.post(`/work-form`, {
        title,
        description,
        pay,
        category,
        dueDate,
        checklist: checkList
    });
    if(json) return true;
}