import api from './';

export default async function postWorkForm(title, description, pay, category, dueDate) {
    try {
        return await postApi(title, description, pay, category, dueDate);
    } catch(err) {
        return false;
    }
}

const postApi = async (title, description, pay, category, dueDate) => {
    const { data: json } = await api.post(`/work-form`, {
        title,
        description,
        pay,
        category,
        dueDate
    });
    if(json) return true;
}