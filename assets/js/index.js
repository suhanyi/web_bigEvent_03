$(function () {
  // 1.获取用户信息
  getUserInfo();

  // 3.退出功能
  var layer = layui.layer;
  $('#btnLogout').on('click', function () {
    layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html';
      layer.close(index);
    });
  })
})

// 1.获取基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      layui.layer.msg(res.message)
      renderAvatar(res.data);
    },
  });
}

// 2.封装用户头像渲染函数
function renderAvatar(user) {
  // 2.1.用户名(昵称优先，没有用usernam)
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎　　' + name);
  // 2.2.用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').show().attr('src', user.user_pic);
    $('.text-avatar').hide();
  } else {
    // 没有头像
    $('.layui-nav-img').hide();
    var text = name[0].toUpperCase();
    $('.text-avatar').show().html(text)
  }
}





