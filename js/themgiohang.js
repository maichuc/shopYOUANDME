// Kiểm tra Local Storage cho giỏ hàng
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sự kiện khi trang web đã được tải hoàn toàn
$(document).ready(function () {
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartCount();

  // Bắt sự kiện khi click vào nút "Add to Cart" trên trang home
  $('.cart').on('click', function () {
    // Lấy thông tin sản phẩm từ trang
    var productName = $(this).closest('.pro').find('.des h5').text();
    var productPrice = parseFloat($(this).closest('.pro').find('.des h4').text().replace('VND', '').replace(',', ''));

    var product = {
      name: productName,
      price: productPrice,
      quantity: 1
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
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: product.name, quantity: 1, price: product.price });
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

  for (var i = 0; i < cart.length; i++) {
    // Tính thành tiền cho sản phẩm
    var subTotal = cart[i].price * cart[i].quantity;

    cartItemsHtml += `<div class="cart-item">
                        <div class="item-name">${cart[i].name}</div>
                        <div class="item-quantity">Số lượng: ${cart[i].quantity}</div>
                        <div class="item-price">Đơn giá: ${cart[i].price.toFixed(3)} VND</div>         
                        <button class="remove-item" data-index="${i}"><i class="bi bi-trash-fill"></i></button>
                      </div>`;
    totalPrice += subTotal;
  }

  $('#cartItems').html(cartItemsHtml);
  $('#total-price').text(totalPrice.toFixed(3));

  // Hiển thị thông tin chi tiết giỏ hàng
  displayCartDetails();
}

// Hiển thị thông tin chi tiết giỏ hàng
function displayCartDetails() {
  var cartDetailsHtml = '';

  for (var i = 0; i < cart.length; i++) {
    cartDetailsHtml += `<div class="cart-item-details">
                          <div class="item-name">${cart[i].name}</div>
                          <div class="item-quantity">Số lượng: ${cart[i].quantity}</div>
                          <button class="remove-item" data-index="${i}"><i class="bi bi-trash-fill"></i></button>
                        </div>`;
  }

  $('#cartDetails').html(cartDetailsHtml);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartCount();
}
