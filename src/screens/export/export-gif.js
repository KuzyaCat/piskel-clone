import GIF from 'gif.js';
import setFPS from '../preview/fps';

const initGif = () => {
    const fps = +localStorage.getItem('fps');
    setFPS(fps);

    const previewItem = document.createElement('canvas');
    previewItem.width = 128;
    previewItem.height = 128;
    previewItem.style.display = 'none';
    document.body.appendChild(previewItem);
    const ctx = previewItem.getContext('2d');

    const frames = JSON.parse(localStorage.getItem('frames')) || [];

    const gif = new GIF({
        workers: 1,
        workerScript: '/dist/gif.worker.js',
        quality: 1,
        width: 128,
        height: 128,
    });

    const download = (dataurl, filename) => {
        const a = document.createElement('a');
        a.href = dataurl;
        a.setAttribute('download', filename);
        a.click();
    };

    gif.on('finished', (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            download(base64data, 'image.gif');
        };
    });

    for (let index = 0; index < frames.length; index += 1) {
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
        gif.addFrame(ctx, { copy: true, delay: 1000 / fps });
    }
    gif.render();
};

export default initGif;
