export const setPrevColor = (color) => {
    document.getElementById('color-prev').value = color;
    localStorage.setItem('prevColor', JSON.stringify(color));
};

export const getPrevColor = () => JSON.parse(localStorage.getItem('prevColor')) || '#000000';
