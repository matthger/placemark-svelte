export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    placemarks: Placemark[];
    _id: string;
}

export interface LoggedInUser {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    _id: string;
}

export interface Category {
    name: string;
    description: string;
    user: string;
    img: string;
    _id: string;
    placemarks: Placemark[];
}

export interface Placemark {
    name: string;
    description: string;
    lat: number;
    lng: number;
    category: any;
    img: string;
    _id: string;
}