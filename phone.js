const phoneNumber = document.querySelector('.phone-number');
phoneNumber.style.transition = 'opacity 0.3s ease-in-out';


const phoneInfo = document.querySelector('.phone-info');
phoneInfo.addEventListener('mouseenter', function() {
    phoneNumber.style.display = 'block';
  phoneNumber.style.opacity = '1';
});


phoneInfo.addEventListener('mouseleave', function() {
    phoneNumber.style.display = 'none';
  phoneNumber.style.opacity = '0';
});