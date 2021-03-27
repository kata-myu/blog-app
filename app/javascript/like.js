window.addEventListener("load", () => {
  const iineForm = document.getElementById("iine");
  iineForm.addEventListener("click", (e) => {
    e.preventDefault();
    const idObj = document.getElementById("like-wrapper");
    const id = idObj.getAttribute("data-index");
    const XHR = new XMLHttpRequest();
    XHR.open("POST",`/blogs/${id}/likes`, true);
    XHR.responseType = "json";
    XHR.send();
    XHR.onload = () => {
      const likes = XHR.response.likes;
      const likesCountArea = document.getElementById("likes-count");
      likesCountArea.innerHTML = `${likes.length}`
      return null;
    }
  })
});