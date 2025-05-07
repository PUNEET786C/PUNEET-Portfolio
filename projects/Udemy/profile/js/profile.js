window.onload = function () {
    if (sessionStorage.getItem("user") == null) {
        window.location.replace("../index.html");
    } else {
        //logout codeing
        let logout = document.getElementById("logout");
        logout.onclick = function(){
            sessionStorage.clear();
            let logout_text = document.getElementById("logout");
            logout_text.innerHTML = "please Wait...";
            setTimeout(function(){window.location = "../index.html";},2000);
        }
        // Get elements once
        let user_email = sessionStorage.getItem("user");
        let json_text = localStorage.getItem(user_email);
        let obj_data = JSON.parse(json_text);

        let profile_name = document.getElementById("profile_name");
        let profile_username = document.getElementById("profile_username");
        let profile_upload = document.getElementById("profile_upload");
        let profile_pic = document.getElementById("profile_pic");
        let profile_icon = document.getElementById("profile_icon");
        let next_btn = document.getElementById("next");
        let page_cover = document.getElementById("container");

        // Set profile name
        profile_name.innerHTML = atob(obj_data.username);
        profile_username.innerHTML = atob(obj_data.username);

        //profile_picture codeing

        let img_url = localStorage.getItem(user_email+"image");
        let profile_picture = document.getElementById("profile_picture");
        profile_picture.style.backgroundImage = "url("+img_url+")";
        profile_picture.style.backgroundSize = "cover";
        profile_picture.style.backgroundPosition = "center";

        // Check if profile photo already saved
        let savedImage = localStorage.getItem(user_email + "image");
        if (savedImage) {
            profile_pic.style.backgroundImage = "url(" + savedImage + ")";
            profile_pic.style.backgroundSize = "cover";
            profile_pic.style.backgroundPosition = "center";
            if (profile_icon) profile_icon.style.display = "none";
            if (page_cover) page_cover.style.display = "none";
        }

        // Upload new profile photo
        profile_upload.onchange = function () {
            if (profile_upload.files.length > 0) {
                let reader = new FileReader();
                reader.readAsDataURL(profile_upload.files[0]);
                reader.onload = function () {
                    let filename = reader.result;
                    profile_pic.style.backgroundImage = "url(" + filename + ")";
                    profile_pic.style.backgroundSize = "cover";
                    profile_pic.style.backgroundPosition = "center";
                    if (profile_icon) profile_icon.style.display = "none";
                    if (next_btn) next_btn.style.display = "block";

                    next_btn.onclick = function () {
                        localStorage.setItem(user_email + "image", filename);
                        if (page_cover) page_cover.style.display = "none";
                        window.location = location.href;
                    }
                }
            }
        }
    }
}
