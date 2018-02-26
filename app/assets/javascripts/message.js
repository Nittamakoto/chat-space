$(function() {
  function buildHTML(message) {
    var image = (message.image !== null) ? `<img src = "${message.image}">`:''
    var html = `<div class = "message" data-id = "${message.id}">
                  <div class = "upper-message">
                    <p class = "upper-message__user-name">${message.user_name}</p>
                    <p class = "upper-message__date">${message.date}</p>
                  </div>
                     <p class="lower-meesage_content">${message.content}</p>
                     <p class="lower-message__image">${image}</p>
                </div>`
    return html;
  }
 $('#new_message').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('')
      $('.hidden').val('')
      moveToBottom()
    })
    .fail(function() {
      alert("エラーが発生しました。");
    })
  })
  function autoUpdate(){
    var message_id = $(".message").last().data("id");
    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: message_id },
      dataType: "json"
    })
    .done(function(data) {
      data.forEach(function(dat) {
      var html = buildHTML(dat);
      $('.messages').append(html);
      moveToBottom()
      })
    })
  }
  setInterval(autoUpdate, 2000);

  function moveToBottom() {
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
  }
})
