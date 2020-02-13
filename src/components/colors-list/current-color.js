export const getCurrentColor = () => JSON.parse(localStorage.getItem('currentColor')) || document.getElementById('color-current').value;

export const setCurrentColor = (color) => {
    localStorage.setItem('currentColor', JSON.stringify(color));
    document.getElementById('color-current').value = color;
};
