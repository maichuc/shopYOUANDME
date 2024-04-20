$(document).ready(function () {
    // Kiểm tra xem có thông tin người dùng trong Local Storage không
    var userInformationString = localStorage.getItem("userInformation");
    var userInformation = JSON.parse(userInformationString) || {};

    // Hiển thị thông tin lên các trường tương ứng
    $("#ten").val(userInformation.ten);
    $("#sdt").val(userInformation.sdt);
    $("#ngaysinh").val(userInformation.ngaysinh);
    $("#email").val(userInformation.email);

    $("#tennguoinhan").val(userInformation.tennguoinhan);
    $("#sdtnguoinhan").val(userInformation.sdtnguoinhan);
    $("#diachi").val(userInformation.diachi);
    $('input[name=thanhtoan][value="' + userInformation.thanhtoan + '"]').prop('checked', true);

    // Cập nhật thông tin khi nhấn nút "Cập nhật"
    $("#updateBtn").click(function () {
        // Lấy giá trị từ các input
        var ngaysinh = $("#ngaysinh").val();
        var tennguoinhan = $("#tennguoinhan").val();
        var sdtnguoinhan = $("#sdtnguoinhan").val();
        var diachi = $("#diachi").val();
        var thanhtoan = $('input[name=thanhtoan]:checked').val();

        // Kiểm tra và chỉ cập nhật các trường đã được điền
        var ngayHienTai = new Date();
        var birthDate = new Date(ngaysinh);

        //Tính số tuổi
        var age = ngayHienTai.getFullYear() - birthDate.getFullYear();

        // Kiểm tra xem tuổi có nằm trong khoảng từ 15 trở lên không
        if (age >= 15) {
            $("#tbBday").html("");
            userInformation.ngaysinh = ngaysinh;
        } else {
            userInformation.ngaysinh = "";
            alert("Độ tuổi chưa phù hợp.");
            $("#tbBday").html("Tuổi phải từ 15.");
            return false;
        }
        // Kiểm tra ten nhận hàng
        if (tennguoinhan.trim() !== "") {
            $("#errtennhanhang").html("");
            userInformation.tennguoinhan = tennguoinhan;
        }  else{
            userInformation.tennguoinhan = "";
            $("#errtennhanhang").html("Vui lòng điền thông tin tên người nhận hàng");
            return false;
        }


        // Kiểm tra sdt nhan hàng
        var KTsdt = /^(03|09|08|07)[0-9]{8}$/;

        if (!KTsdt.test(sdtnguoinhan)) {
            userInformation.sdtnguoinhan = "";
            $("#tbsdt").html("Số điện thoại không hợp lệ! Số điện thoại gồm 10 số(09|03|07|08XXXXXXXX).");
            return false;
        } else {
            $("#tbsdt").html("");
            userInformation.sdtnguoinhan = sdtnguoinhan;
        }

        // Kiểm tra dia chi
        if (diachi.trim() !== "") {
            $("#errnhanhang").html("");
            userInformation.diachi = diachi;
        }else{
            userInformation.diachi = "";
            $("#errnhanhang").html("Vui lòng điền thông tin nhận hàng");
            return false;
        }



        if (thanhtoan) {
            userInformation.thanhtoan = thanhtoan;
        }

        // Lưu thông tin cập nhật vào Local Storage
        localStorage.setItem("userInformation", JSON.stringify(userInformation));

        // Hiển thị thông báo cập nhật thành công
        alert("Cập nhật thông tin thành công.");
    });

    // Sự kiện khi ấn nút về trang home
    $("#homeBtn").click(function () {
        // Chuyển hướng về trang home (đã đăng nhập)
        window.location.href = "home.html";
    });

    
});

