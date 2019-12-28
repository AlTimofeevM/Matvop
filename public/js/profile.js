var profile = document.getElementById('profile');
window.onclick = function(event) {
    if (event.target == profile) {
        this.profile.style.display = "none";
    }
}