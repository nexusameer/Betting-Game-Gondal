import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";


const OpenRoutes = ({ children }) => {
	const loggedIn = useAuthStore((state) => state.isLoggedIn)();

	const location = useLocation();
	return !loggedIn ? (
		<>{children}</>
	) : (
		<Navigate
			to='/'
			replace
			state={{ from: location }}
		/>
	);
};

export default OpenRoutes;
