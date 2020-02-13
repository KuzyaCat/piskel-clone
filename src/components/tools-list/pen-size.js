export const getPenSize = () => {
    const currentSize = +JSON.parse(localStorage.getItem('pen-size')) || 1;
    return currentSize;
};

export const setPenSize = (value) => {
    const sizes = document.getElementsByClassName('pen_size--item');
    for (const key of sizes) {
        key.classList.remove('current');
    }
    document.querySelectorAll(`[data-size='${value}']`)[0].classList.add('current');
    localStorage.setItem('pen-size', JSON.stringify(value));
};
