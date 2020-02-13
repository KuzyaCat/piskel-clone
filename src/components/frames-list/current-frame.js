import { getFrameData, setPixels } from '../../screens/canvas/drawing/pixels';

export const setCurrentFrame = (index, save = false) => {
    const frameItems = document.querySelectorAll('.frames--item');
    for (const item of frameItems) {
        item.classList.remove('current_frame');
    }
    if (save) {
        localStorage.setItem('current-frame', index);
    }
    frameItems[index].classList.add('current_frame');

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const currentFrameColors = getFrameData(index);

    const framePixelWidth = canvas.width / currentFrameColors.length;
    const framePixelHeight = canvas.height / currentFrameColors.length;

    localStorage.setItem('pixelWidth', framePixelWidth);
    localStorage.setItem('pixelHeight', framePixelHeight);

    for (let i = 0; i < currentFrameColors.length; i += 1) {
        for (let j = 0; j < currentFrameColors[i].length; j += 1) {
            ctx.fillStyle = currentFrameColors[i][j];
            ctx.fillRect(j * framePixelWidth, i * framePixelHeight,
                framePixelWidth, framePixelHeight);
        }
    }

    setPixels(currentFrameColors, true);
};

export const getCurrentFrameIndex = () => +localStorage.getItem('current-frame') || 0;
