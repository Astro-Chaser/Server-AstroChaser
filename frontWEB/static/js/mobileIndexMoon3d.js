function setUpCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('3d');
    ctx.translate(0.5, 0.5);
  
    // Set display size (vw/vh).
    var sizeWidth = 80 * window.innerWidth / 100,
      sizeHeight = 100 * window.innerHeight / 100 || 766;
  
    //Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    canvas.style.width = sizeWidth;
    canvas.style.height = sizeHeight;
  }
  
  window.onload = setUpCanvas();