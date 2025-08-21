export const LoginStart = (userCredential) =>({
    type : "login_start"
})

export const LoginSuccess = (user) =>({
    type : "login_success",
    payload : user,
});

export const LoginFailure = () =>({
    type: "login_failure",
})

export const Logout = () =>({
    type: "logout",
})