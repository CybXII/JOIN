
document.addEventListener('DOMContentLoaded', function() {
    let h1 = document.querySelector('#contact-checkbox h1');

    h1.addEventListener('click', function() {
        let contactInfo = document.querySelector('.contact-info');
        contactInfo.classList.toggle('show');
    });
});