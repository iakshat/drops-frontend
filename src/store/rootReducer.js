var initState = {
    isLoggedIn : false,
    userData : null
}

export default function RootReducer(state=initState, action) {

    switch (action.type) {
        case "LOGIN_USER":
            return{
                ...state,
                isLoggedIn : true,
                userData : action.userData
            }
        case "LOGOUT_USER":
            return{
                ...state,
                isLoggedIn : false,
                userData : null
            }
        default:
            return state;
    }

}