if (document.URL.match( /new/ ) || document.URL.match( /edit/ )){
window.addEventListener("load", () => {
  const tagForm = document.getElementById("blog-tag")
  tagForm.addEventListener("keyup", () => {
    const inputValue = tagForm.value
    const XHR = new XMLHttpRequest();
    XHR.open("GET",`/blogs/search/?keyword=${inputValue}`, true);
    // urlの最初の「/」を除いて記述すると今のurlに続けて記述される。最初にを指定すると記述したそのもののurlに飛ぶ
    XHR.responseType = "json";
    XHR.send();
    XHR.onload = () => {
      // 非同期通信が成功したときはonloadプロパティに定義された関数が呼び出される。
      const searchResult = document.getElementById("result");
      searchResult.innerHTML = "";
      const resultsWrapper = document.createElement("div");
      searchResult.appendChild(resultsWrapper);
      if (XHR.response) {
        const tags = XHR.response.keyword;
        tags.forEach((tag) => {
          const childElement = document.createElement("div");
          childElement.setAttribute("class", "child");
          childElement.setAttribute("id", tag.id);
          childElement.innerHTML = tag.name;
          resultsWrapper.appendChild(childElement);
          const clickElement = document.getElementById(tag.id);
          clickElement.addEventListener("click", () => {
            document.getElementById("blog-tag").value = clickElement.textContent;
            resultsWrapper.remove();
          })
        });
      };  
    };
  })
});
}