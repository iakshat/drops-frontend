export const recoverAuth = (loginUser) => {
    if(localStorage.getItem("isLoggedIn") === "true"){
        var user = localStorage.getItem("userData");
        if(user === "" || !user)
            localStorage.setItem("isLoggedIn", false);
        else
            loginUser(JSON.parse(user));
    }
}