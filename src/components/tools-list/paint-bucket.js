import { getCurrentColor } from '../colors-list/current-color';
import { getPixels, setPixels, getPixelSize } from '../../screens/canvas/drawing/pixels';

const paintBucket = (x0, y0) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const currentColor = getCurrentColor();
    ctx.fillStyle = currentColor;
    const colors = getPixels();
    const pixelSizes = getPixelSize();
    const pixelWidth = pixelSizes[0];
    const pixelHeight = pixelSizes[1];

    const height = colors.length;
    const width = colors[0].length;

    const currentPixelColor = colors[y0][x0];

    const paint = (x1, y1) => {
        if ((x1 < 0 || x1 === colors[y1].length) || (y1 < 0 || y1 === colors.length)) {
            return;
        }
        ctx.fillRect(x1 * pixelWidth, y1 * pixelHeight, pixelWidth, pixelHeight);
        colors[y1][x1] = currentColor;
        if (x1 + 1 < width && colors[y1][x1 + 1] === currentPixelColor) {
            paint(x1 + 1, y1);
        }
        if (y1 + 1 < height && colors[y1 + 1][x1] === currentPixelColor) {
            paint(x1, y1 + 1);
        }
        if (x1 > 0 && colors[y1][x1 - 1] === currentPixelColor) {
            paint(x1 - 1, y1);
        }
        if (y1 > 0 && colors[y1 - 1][x1] === currentPixelColor) {
            paint(x1, y1 - 1);
        }
    };
    paint(x0, y0);

    setPixels(colors, true);
};

export default paintBucket;
