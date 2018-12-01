import router from "next/router";
import nprogress from "nprogress";
import { isFunction } from ".";

export const bindNProgress = (onRouteStart, onRouteComplete, onError) => {
	router.onRouteChangeStart = () => {
		if (isFunction(onRouteStart)) {
			onRouteStart();
		}
		nprogress.start();
	};

	router.onRouteChangeComplete = () => {
		if (isFunction(onRouteComplete)) {
			onRouteComplete();
		}
		nprogress.done();
	};

	router.onRouteChangeError = error => {
		if (isFunction(onError)) {
			onError(error);
		}
		nprogress.done();
	};
};

export default bindNProgress;
