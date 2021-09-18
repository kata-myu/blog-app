import consumer from "./consumer"

if (location.pathname.match(/blogs/) && location.pathname.match(/\d+/)){

consumer.subscriptions.create("CommentsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const html = `<p class="comment">${data.comment.comment}</p>`
    const commentArea = document.getElementById("comment-area");
    commentArea.insertAdjacentHTML('afterbegin', html);
    const commentField = document.getElementById("comment-field");
    commentField.value = ""
  }
});
}
