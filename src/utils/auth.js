import { useAuthStore } from "../store/auth";
import axios from "./axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from 'react-hot-toast';

// import { API_BASE_URL } from "./constants";


export const login = async (username, password) => {
	try {
		const { data, status } = await axios.post("/auth/login/", {
			username,
			password,
		});
		if (status === 200) {
			setAuthUser(data.access, data.refresh);
			localStorage.setItem("user", username);
		}
		return { data, error: null };
	} catch (error) {
		console.log(error)
		toast.error(error.response.data?.error || "Something went wrong");
		throw new Error(`Please Check Your credentials ${error?.response?.data?.error}`);
		return {
			data: null,
			error: error.response.data?.detail || "Something went wrong",
		};
	}
};


export const registerUser = async (data) => {

	try {

		const response = await axios.post(`auth/register/`, {
			'username': data?.username,
			'email': data?.email,
			'password': data?.password,
			'refferal_code': data?.refferal_code||"",
			'phone_number': data?.phone_number

		});

		await login(data.username, data.password)
		window.location.href = "/";
		return { error: null, data: response.data }
		// You might want to return the response or handle it accordingly


	} catch (error) {
		console.log(error)
		toast.error(error.response.data?.error || "Something went wrong");
		return { error: error.response.data?.detail || "Something went wrong", data: null }
	}

};


export const logout = () => {
	Cookies.remove("access_token");
	Cookies.remove("refresh_token");
	useAuthStore.getState().setUser(null);
	window.location.href = "/auth/login/";
};

// get current user from the cookie
export const getCurrentUser = () => {
	const accessToken = Cookies.get("access_token");
	if (!accessToken) {
		return null;
	} else {
		return jwtDecode(accessToken);
	}
 };

export const setUser = async () => {
	// ON PAGE LOAD
	try {
		const accessToken = Cookies.get("access_token");
		const refreshToken = Cookies.get("refresh_token");
		if (!accessToken || !refreshToken) {
			return;
		}
		if (isAccessTokenExpired(accessToken)) {
			const response = await getRefreshToken(refreshToken);
			setAuthUser(response.access, response.refresh);
		} else {
			setAuthUser(accessToken, refreshToken);
		}
	} catch (error) { }
};

export const setAuthUser = (access_token, refresh_token) => {
	Cookies.set("access_token", access_token, {
		expires: 7,
		// secure: true,
	});

	Cookies.set("refresh_token", refresh_token, {
		expires: 7,
		// secure: true,
	});

	const user = jwtDecode(access_token) ?? null;

	if (user) {
		useAuthStore.getState().setUser(user);
	}
	useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
	try {
		const refresh_token = Cookies.get("refresh_token");
		const response = await axios.post("/auth/refresh/", {
			refresh: refresh_token,
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const isAccessTokenExpired = (accessToken) => {
	try {
		const decodedToken = jwtDecode(accessToken);
		return decodedToken.exp < Date.now() / 1000;
	} catch (err) {
		return true; // Token is invalid or expired
	}
};


