if (document.URL.match(/new/)){
  window.addEventListener("load", () => {

    const createImage = (blob, dataIndex) => {
       // プレビュー画像作成
       const previewArea = document.getElementById("preview");
       const previewWrapper = document.createElement('div');
       previewWrapper.setAttribute('class', 'preview-area');
       previewWrapper.setAttribute('data-index', dataIndex);
       const preview = document.createElement("img");
       preview.setAttribute('src', blob);
       preview.setAttribute('class', 'preview');
       previewWrapper.appendChild(preview);

       const btnWrapper = document.createElement('div');
       btnWrapper.setAttribute("class", "btn-wrapper");
       const deleteBtn = document.createElement('div');
       deleteBtn.setAttribute('class', 'delete-btn');
       deleteBtn.innerText = "削除";
       btnWrapper.appendChild(deleteBtn);
       const editBtn = document.createElement('div');
       editBtn.setAttribute('class', 'edit-btn');
       editBtn.innerText = "編集";
       btnWrapper.appendChild(editBtn);
       previewWrapper.appendChild(btnWrapper);
       previewArea.appendChild(previewWrapper);

       deleteBtn.addEventListener("click", () => deleteImage(dataIndex));
       editBtn.addEventListener("click", () => {
        if(dataIndex == 0){
          const inputFile0 = document.getElementById("blog-image");
          inputFile0.click();
        }else {
          const fileInput = document.querySelector(`.file-input[data-index="${dataIndex}"]`)
          fileInput.click();
        }
       });


       // インプットボタン作成
       const previewNum = document.querySelectorAll(".preview");
       if(previewNum.length == 3){
         return null
       }
       const inputBtn = document.createElement("input");
       inputBtn.setAttribute('type', 'file');
       inputBtn.setAttribute('name', 'blog_tag[images][]');
       inputBtn.setAttribute('data-index', `${Number(dataIndex) + 1}`);
       inputBtn.setAttribute('class', 'file-input')
       const fileBtns = document.getElementById("file-btns");
       fileBtns.appendChild(inputBtn);

       inputBtn.addEventListener('change', (e) => {
         const oldIndex = e.target.getAttribute("data-index");

         const file = e.target.files[0];
         const dataIndex = e.target.getAttribute("data-index");
         if(!file) {
           deleteImage(dataIndex);
           return null
         }
         const blob = window.URL.createObjectURL(file);
         const oldPreviewWrapper = document.querySelector(`.preview-area[data-index="${oldIndex}"]`);
         if(oldPreviewWrapper) {
           const oldPreview = oldPreviewWrapper.querySelector("img");
           oldPreview.setAttribute('src', blob);
           return null;
         }

         createImage(blob, dataIndex);
       })
    };

    const deleteImage = (indexData) => {
          const previewImage = document.querySelector(`.preview-area[data-index="${indexData}"]`);
          previewImage.remove();
          if(indexData == 0){
            const inputFile0 = document.getElementById("blog-image");
            inputFile0.remove();
          }else {
            const inputFile = document.querySelector(`.file-input[data-index="${indexData}"]`);
            inputFile.remove();
          }

          const inputCount = document.querySelectorAll(".preview").length;
          if(inputCount == 2) {
            const inputBtn = document.createElement("input");
            inputBtn.setAttribute('type', 'file');
            inputBtn.setAttribute('name', 'blog_tag[images][]');
            inputBtn.setAttribute('data-index', `${Number(indexData) + 1}`);
            inputBtn.setAttribute('class', 'file-input')
            const fileBtns = document.getElementById("file-btns");
            fileBtns.appendChild(inputBtn);
            inputBtn.addEventListener('change', (e) => {
              const oldIndex = e.target.getAttribute("data-index");
     
              const file = e.target.files[0];
              const dataIndex = e.target.getAttribute("data-index");
              if(!file) {
                deleteImage(dataIndex);
                return null
              }
              const blob = window.URL.createObjectURL(file);
              const oldPreviewWrapper = document.querySelector(`.preview-area[data-index="${oldIndex}"]`);
              if(oldPreviewWrapper) {
                const oldPreview = oldPreviewWrapper.querySelector("img");
                oldPreview.setAttribute('src', blob);
                return null;
              }
     
              createImage(blob, dataIndex);
            })
          }
    };

    const clickFile = document.getElementById("click-file");
    clickFile.addEventListener("click", () => {
      const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
      const inputBtnArray = Array.from(inputBtns);
      const inputBtnLast = inputBtnArray.slice(-1)[0];
      inputBtnLast.click();
    });
    const inputImage = document.querySelector('input[type="file"][name="blog_tag[images][]"]');
    inputImage.addEventListener("change", (e) => {
      const oldIndex = e.target.getAttribute("data-index");

      const file = e.target.files[0];
      const dataIndex = e.target.getAttribute("data-index");
      if(!file) {
        deleteImage(dataIndex);
        return null
      }
      const blob = window.URL.createObjectURL(file);
      const oldPreviewWrapper = document.querySelector(`.preview-area[data-index="${oldIndex}"]`);
      if(oldPreviewWrapper) {
        const oldPreview = oldPreviewWrapper.querySelector("img");
        oldPreview.setAttribute('src', blob);
        return null;
      }
      
      createImage(blob, dataIndex);
    });

  });
}


if (document.URL.match(/edit/)) {
  window.addEventListener("load", () => {

    const previewLength = document.querySelectorAll(".preview-area");
    if(previewLength.length == 3) {
      const clickFile = document.getElementById("click-file");
      clickFile.setAttribute("style", "display: none;");
    }

    const deleteImage = (indexData) => {
      const previewImage = document.querySelector(`.preview-area[data-index="${indexData}"]`);
      previewImage.remove();
      if(indexData == 0){
        const inputFile0 = document.getElementById("blog-image");
        inputFile0.remove();
      }else {
        const inputFile = document.querySelector(`.file-input[data-index="${indexData}"]`);
        inputFile.remove();
      }

      const inputCount = document.querySelectorAll(".preview").length;
      if(inputCount == 2) {
        const inputBtn = document.createElement("input");
        inputBtn.setAttribute('type', 'file');
        inputBtn.setAttribute('name', 'blog_tag[images][]');
        inputBtn.setAttribute('data-index', `${Number(indexData) + 1}`);
        inputBtn.setAttribute('class', 'file-input')
        const fileBtns = document.getElementById("file-btns");
        fileBtns.appendChild(inputBtn);
        inputBtn.addEventListener('change', (e) => {
          const oldIndex = e.target.getAttribute("data-index");
 
          const file = e.target.files[0];
          const dataIndex = e.target.getAttribute("data-index");
          if(!file) {
            deleteImage(dataIndex);
            return null
          }
          const blob = window.URL.createObjectURL(file);
          const oldPreviewWrapper = document.querySelector(`.preview-area[data-index="${oldIndex}"]`);
          if(oldPreviewWrapper) {
            const oldPreview = oldPreviewWrapper.querySelector("img");
            oldPreview.setAttribute('src', blob);
            return null;
          }
 
          createImage(blob, dataIndex);
        })
      }
    };

    const createImage = (blob, dataIndex) => {
      // プレビュー画像作成
      const previewArea = document.getElementById("preview");
      const previewWrapper = document.createElement('div');
      previewWrapper.setAttribute('class', 'preview-area');
      previewWrapper.setAttribute('data-index', dataIndex);
      const preview = document.createElement("img");
      preview.setAttribute('src', blob);
      preview.setAttribute('class', 'preview');
      previewWrapper.appendChild(preview);

      const btnWrapper = document.createElement('div');
      btnWrapper.setAttribute("class", "btn-wrapper");
      const deleteBtn = document.createElement('div');
      deleteBtn.setAttribute('class', 'delete-btn');
      deleteBtn.innerText = "削除";
      btnWrapper.appendChild(deleteBtn);
      const editBtn = document.createElement('div');
      editBtn.setAttribute('class', 'edit-btn');
      editBtn.innerText = "編集";
      btnWrapper.appendChild(editBtn);
      previewWrapper.appendChild(btnWrapper);
      previewArea.appendChild(previewWrapper);

      deleteBtn.addEventListener("click", () => deleteImage(dataIndex));
      editBtn.addEventListener("click", () => {
       if(dataIndex == 0){
         const inputFile0 = document.getElementById("blog-image");
         inputFile0.click();
       }else {
         const fileInput = document.querySelector(`.file-input[data-index="${dataIndex}"]`)
         fileInput.click();
       }
      });

      // インプットボタン作成
      const previewNum = document.querySelectorAll(".preview");
      if(previewNum.length == 3){
        const clickFile = document.getElementById("click-file");
        clickFile.setAttribute("style", "display: none;");
        return null;
      }
      const inputBtn = document.createElement("input");
      inputBtn.setAttribute('type', 'file');
      inputBtn.setAttribute('name', 'blog_tag[images][]');
      inputBtn.setAttribute('data-index', `${Number(dataIndex) + 1}`);
      inputBtn.setAttribute('class', 'file-input')
      const fileBtns = document.getElementById("file-btns");
      fileBtns.appendChild(inputBtn);
      
      inputBtn.addEventListener('change', (e) => {
        const oldIndex = e.target.getAttribute("data-index");

        const file = e.target.files[0];
        const dataIndex = e.target.getAttribute("data-index");
        if(!file) {
          deleteImage(dataIndex);
          return null
        }
        const blob = window.URL.createObjectURL(file);
        const oldPreviewWrapper = document.querySelector(`.preview-area[data-index="${oldIndex}"]`);
        if(oldPreviewWrapper) {
          const oldPreview = oldPreviewWrapper.querySelector("img");
          oldPreview.setAttribute('src', blob);
          return null;
        }

        createImage(blob, dataIndex);
      })
   };

    // 削除ボタンを押したとき
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        const deleteIndex = e.target.getAttribute("data-blob");
        const dataIndex = e.target.getAttribute("data-index");
        const previewArea = document.querySelector(`.preview-area[data-index="${dataIndex}"]`);
        previewArea.remove();
        const deleteInput = document.createElement("input");
        deleteInput.setAttribute('name', 'blog_tag[delete_blob_ids][]');
        deleteInput.setAttribute('value', deleteIndex);
        const inputArea = document.getElementById('file-btns');
        inputArea.appendChild(deleteInput);

        const previewLength = document.querySelectorAll(".previw-area");
        if (previewLength.length < 3) {
          const clickFile = document.getElementById("click-file");
          clickFile.removeAttribute("style", "display: none;");
          const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
          const inputBtnArray = Array.from(inputBtns);
          const inputBtnLast = inputBtnArray.slice(-1)[0];
          const dataIndex = inputBtnLast.getAttribute("data-index")

          const inputBtn = document.createElement("input");
          inputBtn.setAttribute('type', 'file');
          inputBtn.setAttribute('name', 'blog_tag[images][]');
          inputBtn.setAttribute('data-index', `${Number(dataIndex) + 1}`);
          inputBtn.setAttribute('class', 'file-input')
          const fileBtns = document.getElementById("file-btns");
          fileBtns.appendChild(inputBtn);

          clickFile.addEventListener("click", () => {
            const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
            const inputBtnArray = Array.from(inputBtns);
            const inputBtnLast = inputBtnArray.slice(-1)[0];
            inputBtnLast.click();
          });
          
          fileBtns.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const dataIndex = e.target.getAttribute("data-index");
            if (!file) {
              const preview = document.querySelector(`.preview-area[data-index="${dataIndex}"]`);
              preview.remove();
              return null;
            }
            const blob = window.URL.createObjectURL(file);
            createImage(blob, dataIndex);
          })
        }
      });
    });

    // 編集ボタンを押したとき
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
        const inputBtnArray = Array.from(inputBtns);
        const inputBtnLast = inputBtnArray.slice(-1)[0];
        inputBtnLast.click();

        const editIndex = e.target.getAttribute("data-blob");
        const editInput = document.createElement("input");
        editInput.setAttribute('name', 'blog_tag[delete_blob_ids][]');
        editInput.setAttribute('value', editIndex);
        const inputArea = document.getElementById('file-btns');
        inputArea.appendChild(editInput);

        const previewIndex = e.target.getAttribute("data-index");
        inputBtnLast.addEventListener("change", (e) => {
          const file = e.target.files[0];
          const blob = window.URL.createObjectURL(file);
          const oldPreview = document.querySelector(`.preview-area[data-index="${previewIndex}"]`);
          const oldImage = oldPreview.querySelector("img");
          oldImage.setAttribute("src", blob);
        })

        const previewLength = document.querySelectorAll(".preview-area");
        if (previewLength.length < 3) {
          console.log(previewLength.length);
          const clickFile = document.getElementById("click-file");
          clickFile.removeAttribute("style", "display: none;");
          const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
          const inputBtnArray = Array.from(inputBtns);
          const inputBtnLast = inputBtnArray.slice(-1)[0];
          const dataIndex = inputBtnLast.getAttribute("data-index")

          const inputBtn = document.createElement("input");
          inputBtn.setAttribute('type', 'file');
          inputBtn.setAttribute('name', 'blog_tag[images][]');
          inputBtn.setAttribute('data-index', `${Number(dataIndex) + 1}`);
          inputBtn.setAttribute('class', 'file-input')
          const fileBtns = document.getElementById("file-btns");
          fileBtns.appendChild(inputBtn);
          
          clickFile.addEventListener("click", () => {
            const inputBtns = document.querySelectorAll('input[type="file"][name="blog_tag[images][]"]');
            const inputBtnArray = Array.from(inputBtns);
            const inputBtnLast = inputBtnArray.slice(-1)[0];
            inputBtnLast.click();
          });
          
          fileBtns.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const dataIndex = e.target.getAttribute("data-index");
            if (!file) {
              const preview = document.querySelector(`.preview-area[data-index="${dataIndex}"]`);
              preview.remove();
            }
            const blob = window.URL.createObjectURL(file);
            createImage(blob, dataIndex);
          })
        }
      });
    });

  });
}

// ↑メモ：createImageとdeleteImageをそのまま使ってしまっているのでおかしなことになっている。








// if (document.URL.match( /new/ ) || document.URL.match( /edit/)){
// window.addEventListener("load", () => {

//   const createImage = (blob, dataIndex) => {

//     const oldPreview = document.querySelector(`.preview-image[data-index="${dataIndex}"]`);
//     console.log(oldPreview);
//     if(oldPreview) {
//       oldPreview.setAttribute('src', blob)
//       return
//     }

//     const image = document.createElement("img");
//     image.setAttribute("src", blob);
//     image.setAttribute("class", "preview-image")
//     image.setAttribute("data-index", `${dataIndex}`)
//     const previewArea = document.getElementById("preview");
//     previewArea.appendChild(image);

//     const imageNum = document.querySelectorAll(".preview-image").length;

//     if (imageNum >= 3 ) {
//       return 
//     }

//     const fileBtns = document.getElementById("file-btns");
//     const fileBtn = document.createElement("input");
//     fileBtn.setAttribute("class", "preview-input")
//     fileBtn.setAttribute("type", "file");
//     fileBtn.setAttribute("name", "blog_tag[images][]");
//     fileBtn.setAttribute("data-index", `${Number(dataIndex) + 1}`);
//     fileBtns.appendChild(fileBtn);

//     fileBtn.addEventListener("change", (e) => {
//       file = e.target.files[0];
//       dataIndex = e.target.getAttribute('data-index');
//       if(!file) {
//         const imageNum = document.querySelectorAll(".preview-image").length;
//         if(imageNum == 3) {
//           const fileBtns = document.getElementById("file-btns");
//           const fileBtn = document.createElement("input");
//           fileBtn.setAttribute("class", "preview-input");
//           fileBtn.setAttribute("id", "preview-input");
//           fileBtn.setAttribute("type", "file");
//           fileBtn.setAttribute("name", "blog_tag[images][]");
//           fileBtn.setAttribute("data-index", `${Number(dataIndex) + 1}`);
//           fileBtns.appendChild(fileBtn);
//           fileBtn.addEventListener("change", (e) => {
//             file = e.target.files[0];
//             dataIndex = e.target.getAttribute('data-index');
//             if(!file) {
//               const imageNum = document.querySelectorAll(".preview-image").length;
//               if(imageNum == 3) {
//                 const fileBtns = document.getElementById("file-btns");
//                 const fileBtn = document.createElement("input");
//                 fileBtn.setAttribute("class", "preview-input");
//                 fileBtn.setAttribute("id", "preview-input");
//                 fileBtn.setAttribute("type", "file");
//                 fileBtn.setAttribute("name", "blog_tag[images][]");
//                 fileBtn.setAttribute("data-index", `${Number(dataIndex) + 1}`);
//                 fileBtns.appendChild(fileBtn);
//               }
//               const oldPreview = document.querySelector(`.preview-image[data-index="${dataIndex}"]`);
//               oldPreview.remove();
//               const oldInput = document.querySelector(`input[type="file"][data-index="${dataIndex}"]`);
//               oldInput.remove();
//               return
//             }
//             blob = window.URL.createObjectURL(file);
//             createImage(blob, dataIndex);
//           });
//         }
//         const oldPreview = document.querySelector(`.preview-image[data-index="${dataIndex}"]`);
//         oldPreview.remove();
//         const oldInput = document.querySelector(`input[type="file"][data-index="${dataIndex}"]`);
//         oldInput.remove();
//         return
//       }
//       blob = window.URL.createObjectURL(file);
//       createImage(blob, dataIndex);
//     });
//   };


//   const imageForm = document.querySelector('input[type="file"][name="blog_tag[images][]"]')
//   imageForm.addEventListener("change", (e) => {
    
//     file = e.target.files[0];
//     if(!file) {
//       const imageNum = document.querySelectorAll(".preview-image").length;
//       if(imageNum == 3) {
//         const fileBtns = document.getElementById("file-btns");
//         const fileBtn = document.createElement("input");
//         fileBtn.setAttribute("class", "preview-input");
//         fileBtn.setAttribute("id", "preview-input");
//         fileBtn.setAttribute("type", "file");
//         fileBtn.setAttribute("name", "blog_tag[images][]");
//         fileBtn.setAttribute("data-index", 0);
//         fileBtns.appendChild(fileBtn);
//         fileBtn.addEventListener("change", (e) => {
//           file = e.target.files[0];
//           dataIndex = e.target.getAttribute('data-index');
//           if(!file) {
//             const imageNum = document.querySelectorAll(".preview-image").length;
//             if(imageNum == 3) {
//               const fileBtns = document.getElementById("file-btns");
//               const fileBtn = document.createElement("input");
//               fileBtn.setAttribute("class", "preview-input");
//               fileBtn.setAttribute("id", "preview-input");
//               fileBtn.setAttribute("type", "file");
//               fileBtn.setAttribute("name", "blog_tag[images][]");
//               fileBtn.setAttribute("data-index", 0);
//               fileBtns.appendChild(fileBtn);
//             }
//             const oldPreview = document.querySelector(`.preview-image[data-index="${dataIndex}"]`);
//             oldPreview.remove();
//             const oldInput = document.querySelector(`input[type="file"][data-index="${dataIndex}"]`);
//             oldInput.remove();
//             return
//           }
//           blob = window.URL.createObjectURL(file);
//           createImage(blob, dataIndex);
//         });
//       }
//       const oldPreview = document.querySelector(`.preview-image[data-index="0"]`);
//       oldPreview.remove();
//       const oldInput = document.getElementById("blog-image");
//       oldInput.remove();
//       return
//     }
//     blob = window.URL.createObjectURL(file);

//     dataIndex = e.target.getAttribute('data-index');
//     createImage(blob, dataIndex)
//   });
// });
// }