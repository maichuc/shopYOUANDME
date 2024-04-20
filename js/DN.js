// dangnhap.js
$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();

        var loginEmail = $("#loginEmail").val();
        var loginPassword = $("#loginPassword").val();

        if (kiemtradangnhap(loginEmail, loginPassword)) {
            // Nếu đăng nhập thành công, chuyển hướng đến trang Home
            window.location.href = "home.html";
        } else {
            alert("Lỗi: Email hoặc mật khẩu không đúng.");
        }
    });

    function kiemtradangnhap(loginEmail, loginPassword) {
        // Lấy thông tin người dùng từ Local Storage
        var userInformationString = localStorage.getItem("userInformation");
        if (userInformationString) {
            var userInformation = JSON.parse(userInformationString);
            // Kiểm tra đúng địa chỉ email và mật khẩu
            return userInformation.email === loginEmail && userInformation.password === loginPassword;
        }
        return false;
    }
});
