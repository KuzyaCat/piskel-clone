import { setPixels, getPixelSize } from './pixels';

const clearCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSizes = getPixelSize();
    const colors = [];
    for (let i = 0; i < canvas.height / pixelSizes[1]; i += 1) {
        const arr = [];
        for (let j = 0; j < canvas.width / pixelSizes[0]; j += 1) {
            arr.push('#ffffff');
        }
        colors.push(arr);
    }

    setPixels(colors, true);
};

export default clearCanvas;
