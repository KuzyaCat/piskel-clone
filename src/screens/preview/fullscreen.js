const openFullscreen = () => {
    const elem = document.getElementById('preview');

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};

const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

const initFullscreenEvents = () => {
    document.getElementById('fullscreen').addEventListener('click', () => openFullscreen());
    document.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === localStorage.getItem('fullscreen-sc')) {
            openFullscreen();
        }
        if (e.key === 'Escape') {
            if (document.fullscreenElement) {
                closeFullscreen();
            }
        }
    });
};

export default initFullscreenEvents;
