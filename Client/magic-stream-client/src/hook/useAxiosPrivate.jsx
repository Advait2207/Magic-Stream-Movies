import { useEffect, useRef } from "react";
import axios from "axios";
import useAuth from "./useAuth";

//const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = window.__ENV__?.API_URL;

const useAxiosPrivate = () => {
    const { setAuth } = useAuth();

    const axiosAuth = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
    });

    const isRefreshing = useRef(false);
    const failedQueue = useRef([]);

    const processQueue = (error) => {
        failedQueue.current.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve();
            }
        });

        failedQueue.current = [];
    };

    useEffect(() => {
        const interceptor = axiosAuth.interceptors.response.use(
            (response) => response,

            async (error) => {
                console.log("⚠️ Interceptor caught error:", error);

                const originalRequest = error.config;

                if (
                    originalRequest?.url?.includes("/refresh") &&
                    error.response?.status === 401
                ) {
                    console.error("❌ Refresh token has expired or is invalid.");
                    return Promise.reject(error);
                }

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry
                ) {
                    if (isRefreshing.current) {
                        return new Promise((resolve, reject) => {
                            failedQueue.current.push({ resolve, reject });
                        })
                            .then(() => axiosAuth(originalRequest))
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing.current = true;

                    return new Promise((resolve, reject) => {
                        axiosAuth
                            .post("/refresh")
                            .then(() => {
                                processQueue(null);

                                axiosAuth(originalRequest)
                                    .then(resolve)
                                    .catch(reject);
                            })
                            .catch((refreshError) => {
                                processQueue(refreshError);

                                setAuth(null);

                                reject(refreshError);
                            })
                            .finally(() => {
                                isRefreshing.current = false;
                            });
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.response.eject(interceptor);
        };
    }, [setAuth]);

    return axiosAuth;
};

export default useAxiosPrivate;