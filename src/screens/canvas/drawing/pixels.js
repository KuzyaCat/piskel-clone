import updatePreview from '../../preview/preview';
import setFPS from '../../preview/fps';

export const getPixelSize = () => {
    const pixelWidth = +localStorage.getItem('pixelWidth') || 4;
    const pixelHeight = +localStorage.getItem('pixelHeight') || 4;

    return [pixelWidth, pixelHeight];
};

export const setFrameData = (colors, save = false) => {
    const frameColors = colors;
    const pixelSizes = getPixelSize();
    const pixelWidth = pixelSizes[0];
    const pixelHeight = pixelSizes[1];

    const currentFrame = document.querySelectorAll('.frames--item.current_frame')[0];
    const ctx = currentFrame.getContext('2d');
    if (frameColors.length === 0) {
        for (let i = 0; i < currentFrame.height / pixelHeight; i += 1) {
            const row = [];
            for (let j = 0; j < currentFrame.width / pixelWidth; j += 1) {
                row.push('#ffffff');
            }
            frameColors.push(row);
        }
    } else {
        const canvas = document.getElementById('canvas');
        const framePixelWidth = (currentFrame.width / canvas.width) * pixelWidth;
        const framePixelHeight = (currentFrame.height / canvas.height) * pixelHeight;
        for (let i = 0; i < frameColors.length; i += 1) {
            for (let j = 0; j < frameColors[i].length; j += 1) {
                if (frameColors[i][j] !== 0) {
                    ctx.fillStyle = frameColors[i][j];
                    ctx.fillRect(j * framePixelWidth, i * framePixelHeight,
                        framePixelWidth, framePixelHeight);
                }
            }
        }
    }

    if (save) {
        const frameItems = document.querySelectorAll('.frames--item');
        let index;
        for (let i = 0; i < frameItems.length; i += 1) {
            if (frameItems[i].classList.contains('current_frame')) index = i;
        }

        const frames = JSON.parse(localStorage.getItem('frames')) || [];
        if (frames.length === 0) {
            frames.push(frameColors);
        } else {
            frames.splice(index, 1, frameColors);
        }

        localStorage.setItem('frames', JSON.stringify(frames));
    }
};

export const getFrameData = (index) => {
    const frames = JSON.parse(localStorage.getItem('frames'));
    return frames[index];
};

let pixels;
const emptyArr = [];

const getEmptyArr = () => {
    if (emptyArr.length > 0) {
        return emptyArr;
    }
    const canvas = document.getElementById('canvas');
    const pixelSizes = getPixelSize();
    for (let i = 0; i < canvas.height / pixelSizes[1]; i += 1) {
        const arr = [];
        for (let j = 0; j < canvas.width / pixelSizes[0]; j += 1) {
            arr.push('#ffffff');
        }
        emptyArr.push(arr);
    }
    return emptyArr;
};

export const setPixels = (colors, save = false) => {
    pixels = colors;
    if (save) {
        localStorage.setItem('colors', JSON.stringify(colors));
        setFrameData(pixels, true);
    }
    const fps = +localStorage.getItem('fps');
    setFPS(fps);
    updatePreview(fps);
};

export const getPixels = () => {
    const colors = pixels || JSON.parse(localStorage.getItem('colors')) || getEmptyArr();
    pixels = colors;
    return colors;
};

export const setPixelSize = (width, height) => {
    const canvas = document.getElementById('canvas');
    localStorage.setItem('pixelWidth', width);
    localStorage.setItem('pixelHeight', height);

    const colors = [];
    for (let i = 0; i < canvas.height / height; i += 1) {
        const arr = [];
        for (let j = 0; j < canvas.width / width; j += 1) {
            arr.push('#ffffff');
        }
        colors.push(arr);
    }
    setPixels(colors, true);
};
