
document.addEventListener('DOMContentLoaded', function() {
    let h1 = document.querySelector('active-contact');

    h1.addEventListener('click', function() {
        let contactInfo = document.querySelector('.contact_info');
        contactInfo.classList.toggle('show');
    });
});