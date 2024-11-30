class RequestManager {
  static handleFileSelect(event, imgSelector) {
    // не робимо async бо файл може бути великим і щоб не блокувало сторінку
    console.log("imgSelector");
    console.log(imgSelector);
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.querySelector(imgSelector);
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
