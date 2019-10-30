import axios from 'axios';
let login = (data) => axios.post('/api/admin/login', data);
let register = (data) => axios.post('/api/admin/register', data);
let info = (data) => axios.put('/api/user/', data);
let userInfo = (data) => axios.get('/api/admin', { params: data });
let remove = (data) => axios.delete('/api/admin', { params: data });
let update = (data) => axios.put('/api/admin', data);
let usermsg = (data) => axios.get('/api/admin', { params: data });
let list = (data) => axios.get('/api/admin/list', { params: data });
export default {
	login,
	register,
	info,
	userInfo,
	remove,
	update,
	usermsg,
	list,
}
