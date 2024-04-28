document.addEventListener("DOMContentLoaded", function() {
    var imagens = document.querySelectorAll(".imagem");
    var currentSlide = 0;
    var slidesCount = imagens.length;

    imagens[currentSlide].style.display = "block";

    setInterval(nextSlide, 5000); 

    function nextSlide() {
        imagens[currentSlide].style.display = "none"; 
        
        currentSlide = (currentSlide + 1) % slidesCount; 
        
        imagens[currentSlide].style.display = "block"; 
    }
});
