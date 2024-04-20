// Kiểm tra xem có giỏ hàng đã lưu trong Local Storage chưa
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sự kiện khi trang web đã được tải hoàn toàn
$(document).ready(function () {
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartCount();

  // Bắt sự kiện khi click vào nút "Add to Cart" trên trang home
  $('.pro .cart').on('click', function (event) {
    event.stopPropagation();

    // Lấy thông tin sản phẩm từ trang
    var productName = $(this).closest('.pro').find('.des h5').text();
    var productPrice = parseFloat($(this).closest('.pro').find('.des h4').text().replace('VND', '').replace(',', ''));
    var productQuantity = parseInt($(this).closest('.pro').find('.quantity-input').val()) || 1;

    // Kiểm tra xem số lượng có hợp lệ không
    if (isNaN(productQuantity) || productQuantity <= 0) {
      alert('Vui lòng nhập số lượng hợp lệ.');
      return;
    }

    var product = {
      name: productName,
      price: productPrice,
      quantity: productQuantity
    };

    // Thêm sản phẩm vào giỏ hàng
    addToCart(product);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount();
  });

  // Bắt sự kiện khi click vào nút "Add to Cart" trên trang chi tiết sản phẩm
  $('.single-pro-details .cart').on('click', function () {
    // Lấy thông tin sản phẩm từ trang chi tiết
    var productName = $('.single-pro-details h4').text();
    var productPrice = parseFloat($('.single-pro-details h2').text().replace('VND', '').replace(',', ''));
    var productQuantity = parseInt($('#soLuong').val()) || 1;

    // Kiểm tra xem số lượng có hợp lệ không
    if (isNaN(productQuantity) || productQuantity <= 0) {
      alert('Vui lòng nhập số lượng hợp lệ.');
      return;
    }

    var product = {
      name: productName,
      price: productPrice,
      quantity: productQuantity
    };

    // Thêm sản phẩm vào giỏ hàng
    addToCart(product);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount();
  });

  // Hiển thị giỏ hàng khi click vào biểu tượng giỏ hàng
  $('#cart-icon').on('click', function () {
    displayCart();
  });

  // Sự kiện click khi xóa sản phẩm khỏi giỏ hàng
  $(document).on('click', '.remove-item', function () {
    var index = $(this).data('index');
    removeFromCart(index);
    displayCart();  // Cập nhật hiển thị giỏ hàng sau khi xóa
  });
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  var totalItems = 0;

  // Kiểm tra xem giỏ hàng có rỗng không
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      totalItems += cart[i].quantity;
    }
  }

  $('#cart-count').text(totalItems);
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  var existingProduct = cart.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push({ name: product.name, quantity: product.quantity, price: product.price });
  }

  // Lưu giỏ hàng vào Local Storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Hiển thị giỏ hàng
function displayCart() {
  // Hiển thị modal giỏ hàng và hiển thị thông tin chi tiết
  $('#cartModal').modal('show');
  var cartItemsHtml = '';
  var totalPrice = 0;

  // Lặp qua từng sản phẩm trong giỏ hàng
  for (var i = 0; i < cart.length; i++) {
    // Tạo HTML cho từng sản phẩm trong giỏ hàng
    cartItemsHtml += `<div class="cart-item">
                        <div class="item-name">${cart[i].name}</div>
                        <div class="item-quantity">Số lượng: ${cart[i].quantity}</div>
                        <button class="remove-item" data-index="${i}">Xóa</button>
                      </div>`;
    // Tính tổng giá tiền
    totalPrice += cart[i].price * cart[i].quantity;
  }

  // Hiển thị HTML của giỏ hàng
  $('#cartItems').html(cartItemsHtml);
  // Hiển thị tổng giá tiền
  $('#total-price').text(totalPrice.toFixed(3));

  // Hiển thị thông tin chi tiết giỏ hàng
  displayCartDetails();
}

// Hiển thị thông tin chi tiết giỏ hàng
function displayCartDetails() {
  var cartDetailsHtml = '';

  // Lặp qua từng sản phẩm trong giỏ hàng
  for (var i = 0; i < cart.length; i++) {
    // Tạo HTML cho từng sản phẩm trong thông tin chi tiết giỏ hàng
    cartDetailsHtml += `<div class="cart-item-details">
                          <div class="item-name">${cart[i].name}</div>
                          <div class="item-quantity">Số lượng: ${cart[i].quantity}</div>
                          <button class="remove-item" data-index="${i}">Xóa</button>
                        </div>`;
  }

  // Hiển thị HTML của thông tin chi tiết giỏ hàng
  $('#cartDetails').html(cartDetailsHtml);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  cart.splice(index, 1);
  // Lưu giỏ hàng vào Local Storage sau khi xóa sản phẩm
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartCount();
}

// Kiểm tra số lượng hợp lệ: Trong sự kiện "Add to Cart", đã thêm kiểm tra để đảm bảo số lượng nhập vào là một số dương hợp lệ.
// Sự kiện ngăn chặn sự kiện đệ quy: Đã thêm event.stopPropagation(); trong sự kiện "Add to Cart" để ngăn chặn sự kiện đệ quy khi nút được nhấn.
// Lặp qua mảng giỏ hàng: Trong hàm displayCart, đã sử dụng vòng lặp để duyệt qua mỗi sản phẩm trong giỏ hàng và tạo HTML tương ứng.
// Hiển thị thông tin chi tiết giỏ hàng: Sử dụng hàm displayCartDetails để hiển thị thông tin chi tiết giỏ hàng, tạo HTML tương ứng cho mỗi sản phẩm.
// Xóa sản phẩm khỏi giỏ hàng: Trong sự kiện "Remove Item", xóa sản phẩm khỏi giỏ hàng, sau đó cập nhật lại giỏ hàng và hiển thị.