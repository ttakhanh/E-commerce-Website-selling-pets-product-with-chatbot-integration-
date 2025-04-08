const { body } = require('express-validator');

module.exports = [
  body('title')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Ít nhất phải có tên sản phẩm!'),
  body('price')
    .custom((value) => {
      if (parseInt(value) < 1) {
        throw new Error('Giá tiền phải lớn hơn 1 VND!');
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
  body('discount')
    .custom((value) => {
      if (parseInt(value) < 0) {
        throw new Error('Số phần trăm (%) giảm giá phải là số dương!');
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
  body('category')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Danh mục sản phẩm là bắt buộc!'),
  body('description')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Mô tả về sản phẩm là bắt buộc'),
  body('stock')
    .custom((value) => {
      if (parseInt(value) < 20) {
        errors.push({ msg: 'Kho hàng phải chứa trên 20!' });
        throw new Error('Kho hàng phải chứa trên 20!');
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
];
