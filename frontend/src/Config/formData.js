const baseUrl = "http://localhost:5000/";

export const loginFormData = {
    type: "Login",
    btn: "Login",
    labels: ["Username", "Password"],
    inputs: ["username", "userpass"],
    route: `${baseUrl}login`, 
    method: "POST",
    stateLocation: "form1"
}

export const signUpFormData = {
    type: "SignUp",
    btn: "Sign Up",
    labels: ["Username", "Email", "Password", "Confirm Password"],
    inputs: ["username", "useremail", "userpass", "userconfirm"],
    route: `${baseUrl}signup`,
    method: "POST",
    stateLocation: "form2"
}

export const managePasswordFormData = {
    type: "UpdatePassword",
    btn: "Update Password",
    labels: ["Current Password", "New Password", "Confirm New Password"],
    inputs: ["current", "newpw", "confirm"],
    route: `${baseUrl}updatepassword`, 
    method: "POST",
    stateLocation: "form1"

}

export const deleteAccountFormData = {
    type: "DeleteAccount",
    btn: "DeleteAccount",
    labels: ["Confirm Password"],
    inputs: ["confirm"],
    route: `${baseUrl}deleteaccount`, 
    method: "DELETE",
    stateLocation: "form2"

}