let prevScrollpos =  window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector(".navbar").classList.remove("hidden");
    } else {        document.querySelector(".navbar").classList.add("hidden");
    }
    prevScrollpos = currentScrollPos;
}