/* Start Signup Coding */
window.onload = function () {
    let signup_frm = document.getElementById("signup_frm");

    if (signup_frm) {
        signup_frm.onsubmit = function () {
            let user = btoa(document.getElementById("username").value.trim());
            let email = btoa( document.getElementById("email").value.trim());
            let pass = btoa(document.getElementById("password").value.trim());
            let phone = btoa(document.getElementById("phone").value.trim());

            if (user !== "" && email !== "" && pass !== "" && phone !== "") {
                let user_object_data = { username: user, email: email, password: pass, phone: phone };
                let user_text_data = JSON.stringify(user_object_data);

                localStorage.setItem(email, user_text_data);

                let signup_btn = document.getElementById("signup_btn");
                if (signup_btn) {
                    signup_btn.style.background = "#14b129";
                    signup_btn.innerHTML = "<i class='fa fa-check-circle'></i> Sign up Successful!";
                    setTimeout(function () {
                        signup_btn.style.background = "linear-gradient(to right, #d7f7ed, #d1f6be)";
                        signup_btn.innerHTML = "Sign up";
                        signup_frm.reset();
                    }, 3000);
                }
            }
            return false;
        };      
    }

    /* Start Email Validation */
    let email_input = document.getElementById("email");
    if (email_input) {
        email_input.onchange = function () {
            let email = btoa(email_input.value.trim());
            let warning = document.getElementById("email_notice");
            let signup_btn = document.getElementById("signup_btn");

            if (localStorage.getItem(email) !== null) {
                if (warning) warning.style.display = "block";
                email_input.style.borderBottomColor = "red";
                if (signup_btn) {
                    signup_btn.disabled = true;
                    signup_btn.style.background = "#ccc";
                }

                email_input.onclick = function () {
                    email_input.value = "";
                    email_input.style.borderBottomColor = "#ccc";
                    if (warning) warning.style.display = "none";
                    if (signup_btn) {
                        signup_btn.disabled = false;
                        signup_btn.style.background = "linear-gradient(to right, #d7f7ed, #d1f6be)";
                    }
                };
            }
        };
    }

    /* Start Login Coding */
    let login_frm = document.getElementById("login_frm");

    if (login_frm) {
        login_frm.onsubmit = function () {
            let email = document.getElementById("login_email");
            let password = document.getElementById("login_password");
            let login_email_war = document.getElementById("login_email_warning");
            let login_password_war = document.getElementById("login_password_warning");

            let userData = localStorage.getItem(btoa(email.value.trim()));

            if (userData === null) {
                if (login_email_war) login_email_war.style.display = "block";
                email.style.borderBottomColor = "red";

                email.onclick = function () {
                    email.value = "";
                    if (login_email_war) login_email_war.style.display = "none";
                    email.style.borderBottomColor = "#ccc";
                };
            } else {
                let obj_data = JSON.parse(userData);

                if (btoa(password.value) === obj_data.password) {
                 
                    sessionStorage.setItem("user",btoa(email.value.trim()));
                    window.location.replace("profile/profile.html");

                } 
                else {
                    if (login_password_war) login_password_war.style.display = "block";
                    password.style.borderBottomColor = "red";

                    password.onclick = function () {
                        password.value = "";
                        if (login_password_war) login_password_war.style.display = "none";
                        password.style.borderBottomColor = "#ccc";
                    };
                }
            }

            return false;
        };
    }
};
/* End of all code */
