$(function () {
  // 1.自定义验证规则--校验表单数据
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间"
      }
    }
  });


  // 2.初始化用户信息
  initUserInfo();
  var layer = layui.layer
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 3.重置表单
  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo()
  })

  // 4.修改用户信息

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜你修改成功！')
        window.parent.getUserInfo()
      }
    })
  })


})