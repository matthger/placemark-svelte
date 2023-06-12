import axios from "axios";
import {user} from "../stores";
import type {Category, Placemark, User} from "./placemark-types";

export const placemarkService = {
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://placemark-hapi-kc59.onrender.com",

    async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                isAdmin: false
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async login(admin: boolean, email: string, password: string): Promise<boolean> {
        try {
            const url = (admin) ? `${this.baseUrl}/api/admin/login` : `${this.baseUrl}/api/users/authenticate`;
            const response = await axios.post(url, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    _id: response.data._id,
                    email: email,
                    token: response.data.token,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                });
                localStorage.user = JSON.stringify({_id: response.data._id, email:email, token:response.data.token, firstName:response.data.firstName, lastName:response.data.lastName});
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async logout() {
        user.set({
            _id: "",
            email: "",
            token: "",
            firstName: "",
            lastName: ""
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("user");
    },

    reload() {
        if (!axios.defaults.headers.common["Authorization"]) {
            const placemarkCredentials = localStorage.user;
            if (placemarkCredentials) {
                const savedUser = JSON.parse(placemarkCredentials);
                user.set({
                    _id: savedUser._id,
                    email: savedUser.email,
                    token: savedUser.token,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName
                });
                axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
            }
        }
    },

    async getUserCategories(id: string): Promise<Category[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/categories/user/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return [];
        }
    },

    async getPlacemarksByUserId(id:string): Promise<Placemark[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data.filter((placemark: Placemark) => placemark.category.user === id);
        } catch (error) {
            await this.checkUnauthorized(error);
            return [];
        }
    },

    async changePassword(id: string, currentPassword: string, newPassword: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/password/${id}`, { currentPassword, newPassword});
            return response.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async createCategory(category: Category): Promise<any> {
        try {
            const res = await axios.post(`${this.baseUrl}/api/categories`, category);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async deleteCategory(id: string): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/api/categories/${id}`);
            return true;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async editCategory(id: string, category: string): Promise<any> {
        try {
            const res = await axios.put(`${this.baseUrl}/api/categories/${id}`, category);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async uploadImage(context: string, id: string, image: any): Promise<string> {
        const res = await axios.post(`${this.baseUrl}/api/${context}/${id}/uploadimage`, image, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data;
    },

    async deleteImage(context: string, id: string): Promise<any> {
        const res = await axios.delete(`${this.baseUrl}/api/${context}/${id}/deleteimage`);
        return res.data;
    },

    async checkUnauthorized(error: any): Promise<void> {
        if (error.response.status === 401) {
            await this.logout();
            window.location.href = "/login";
        }
    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const categories = await this.getUserCategories(id);
            const placemarks = await this.getPlacemarksByUserId(id);
            for (const category of categories) {
                await this.deleteCategory(category._id);
            }
            for (const placemark of placemarks) {
                await this.deletePlacemark(placemark._id);
            }
            await axios.delete(`${this.baseUrl}/api/users/${id}`);
            return true;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async createPlacemark(placemark: Placemark): Promise<any> {
        try {
            const res = await axios.post(`${this.baseUrl}/api/placemarks`, placemark);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async deletePlacemark(id: string): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/api/placemarks/${id}`);
            return true;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async editPlacemark(id: string, placemark: Placemark): Promise<any> {
        try {
            const res = await axios.put(`${this.baseUrl}/api/placemarks/${id}`, placemark);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async getCategories(): Promise<Category[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/categories`);
            return response.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return [];
        }
    },

    async getPlacemarks(): Promise<Placemark[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return [];
        }
    },

    async getUsers(): Promise<User[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/users`);
            return response.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return [];
        }
    },

    async makeAdmin(id: string): Promise<any> {
        try {
            const res = await axios.post(`${this.baseUrl}/api/users/${id}/makeadmin`);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    },

    async removeAdmin(id: string): Promise<any> {
        try {
            const res = await axios.post(`${this.baseUrl}/api/users/${id}/removeadmin`);
            return res.data;
        } catch (error) {
            console.log(error);
            await this.checkUnauthorized(error);
            return false;
        }
    }
};