import setFPS from './fps';

let intervalRef;

const updatePreview = (fps = 1) => {
    const clear = () => {
        clearInterval(intervalRef);
    };
    clear();

    setFPS(fps);

    const previewItem = document.getElementById('preview');
    const ctx = previewItem.getContext('2d');

    const frames = JSON.parse(localStorage.getItem('frames')) || [];

    let index = 0;

    intervalRef = setInterval(() => {
        const frameColors = frames[index];
        for (let i = 0; i < frameColors.length; i += 1) {
            for (let j = 0; j < frameColors[i].length; j += 1) {
                const framePixelWidth = 128 / frameColors[i].length;
                const framePixelHeight = 128 / frameColors.length;
                ctx.fillStyle = frameColors[i][j];
                ctx.fillRect(j * framePixelWidth, i * framePixelHeight,
                    framePixelWidth, framePixelHeight);
            }
        }
        index += 1;
        if (index >= frames.length) {
            index = 0;
        }
    }, 1000 / fps);
};

export default updatePreview;
