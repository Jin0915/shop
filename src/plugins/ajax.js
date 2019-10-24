import axios from 'axios'
let post = async (url, formdata) => {
	let { data } = await axios.post(url, formdata);
	return data;
}
export default {
	post
} 
