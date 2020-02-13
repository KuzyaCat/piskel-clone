const setFPS = (fps) => {
    localStorage.setItem('fps', fps);
    const text = document.querySelectorAll('.fps_value')[0];
    text.textContent = `FPS: ${fps}`;
};

export default setFPS;
