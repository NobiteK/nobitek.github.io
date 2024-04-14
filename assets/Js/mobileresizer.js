function toggleContent() {
    var mobileContent = document.getElementById('mobileContent');
    var desktopContent = document.getElementById('desktopContent');
    var screenWidth = window.innerWidth;

    if (screenWidth <= 768) { // Assuming 768px is the breakpoint for mobile devices
        mobileContent.style.display = 'block';
        desktopContent.style.display = 'none';
    } else {
        mobileContent.style.display = 'none';
        desktopContent.style.display = 'block';
    }
}

toggleContent();

window.addEventListener('resize', toggleContent);
