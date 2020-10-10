$(function () {
  // 1.验证密码
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 新旧密码不一样
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return "新旧密码不能一致！！"
      }
    },
    // 两次新密码必须相同
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return "两次密码不一致！！"
      }
    },
  });


  // 2.表单提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('密码更新失败！')
        }
        layui.layer.msg('密码更新成功！')
        $('.layui-form')[0].reset()
      }
    })
  })








})