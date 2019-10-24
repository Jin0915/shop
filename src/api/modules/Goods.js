import axios from 'axios';
let list = (data) => axios.get('/api/admin/goods/list', { params: data });
let detail = (data) => axios.get('/api/admin/goods', { params: data });
let edit = (data) => axios.put('/api/admin/goods', data);
let release = (data) => axios.post('/api/admin/goods', data);
let remove = (data) => axios.delete('/api/admin/goods/list', { params: data });
export default {
	list,
	detail,
	edit,
	release,
	remove,
}
