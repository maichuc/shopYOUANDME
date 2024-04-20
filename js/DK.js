$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();

        // Lấy giá trị từ các input
        var ten= $("#ten").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var sdt = $("#sdt").val();

        // Kiểm tra điều kiện đăng ký
        if (kiemtradangki(email, password, sdt)) {
            // Lưu thông tin người dùng vào Local Storage
            var userInformation = {
                ten: ten,
                sdt: sdt,
                email: email,
                password: password
            };
            localStorage.setItem("userInformation", JSON.stringify(userInformation));


            // Chuyển hướng đến trang thông tin cá nhân
            window.location.href = "login.html";
        } else {
            // Hiển thị thông báo lỗi
            alert("Lỗi: Vui lòng kiểm tra lại thông tin đăng ký.");
        }
    });

    function kiemtradangki(email, password, sdt) {

       
        // Kiểm tra định dạng email bằng biểu thức chính quy
        var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            $("#emailError").text("Địa chỉ email không hợp lệ.");
            return false;
        } else {
            $("#emailError").text("");
        }

        // Kiểm tra định dạng số điện thoại bằng biểu thức chính quy
        var KTsdt = /^(03|09|08|07)[0-9]{8}$/;

        if (!KTsdt.test(sdt)) {
            $("#sdtError").text("Số điện thoại không hợp lệ! Số điện thoại gồm 10 số(09|03|07|08XXXXXXXX).");
            return false;
        } else {
            $("#sdtError").text("");
        }

        // Kiểm tra mật khẩu bằng biểu thức chính quy
        //  yêu cầu ít nhất 6 ký tự bất kỳ
        var passwordRegex = /^.{6,}$/;
        if (!passwordRegex.test(password)) {
            $("#passwordError").text("Mật khẩu phải có ít nhất 6 ký tự");
            return false;
        } else {
            $("#passwordError").text("");
        }

        return true;
    }
});
