export const loginUser = (user) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userData", JSON.stringify(user));
    return {
        type : "LOGIN_USER",
        userData : user
    }
}

export const logoutUser = () => {
    localStorage.removeItem("userData");
    localStorage.setItem("isLoggedIn", false);
    return {
        type : "LOGOUT_USER"
    }
}