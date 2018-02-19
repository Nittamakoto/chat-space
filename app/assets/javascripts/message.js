$(function(){
  function buildHTML(message) {
    var image = (message.image == null) ? "" : `<img src="${message.image}">`;
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">${message.user_name}</div>
                    <div class="upper-message__date">${message.date}</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-meesage_content">${message.content}
                  </div>
                  <div class="lower-message__image">
                    ${image}
                  </div>
                </div>`
    return html;
  };
  $('#new_message').on('submit', function(e){
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('')
      $('.hidden').val('')
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })
    .fail(function(){
      alert('エラーが発生しました。');
    })
  })
});
