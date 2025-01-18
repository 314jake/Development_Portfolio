function toggleNav() {
    if (document.querySelector("nav").style.top === "5rem") {
        document.querySelector("nav").style.top = "-10rem";
    } else {
        document.querySelector("nav").style.top = "5rem";
    }
}