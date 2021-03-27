if (document.URL.match( /new/ ) || document.URL.match( /edit/)){
window.addEventListener("load", () => {
  const imageForm = document.getElementById("blog-image")
  imageForm.addEventListener("change", (e) => {
    preImage = document.querySelector("img");
    if (preImage) {
      preImage.remove();
    }
    
    file = e.target.files[0];
    blob = window.URL.createObjectURL(file);

    const image = document.createElement("img");
    image.setAttribute("src", blob);
    image.setAttribute("class", "preview-image")
    const previewArea = document.getElementById("preview");
    previewArea.appendChild(image);

  });
});
}