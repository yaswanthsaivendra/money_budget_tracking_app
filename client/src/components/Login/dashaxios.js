import axios from "../../axios";
import Cookies from "js-cookie";
export const loginSubmit= async (admissiono, password) => {
    const res = await axios.post(
        "/login",
        {
            admissionNo: admissiono,
            password: password,
        },
        
    );
    const { data } = res;

    if (!data.success) {
        return {
            success: false,
            message: "Error Logging In . Wrong UserId or Password",
        };
    }
    //set cookie
    const { token } = data;
    //setting up cookies
    Cookies.set("token", token, { expires: 1, path: "/" });

    localStorage.setItem("token", token);
    return {
        ...data,
        message: "Login Successful",
    };
};