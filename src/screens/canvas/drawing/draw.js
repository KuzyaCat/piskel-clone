import { getCurrentTool } from '../../../components/tools-list/current-tool';
import { getCurrentColor } from '../../../components/colors-list/current-color';
import { getPixels, setPixels, getPixelSize } from './pixels';

export const drawingState = {
    isDrawing: false,
    x0: 0,
    y0: 0,
};

export const draw = (e) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const currentTool = getCurrentTool();
    const pixelSizes = getPixelSize();
    const pixelWidth = pixelSizes[0];
    const pixelHeight = pixelSizes[1];
    const colors = getPixels();
    let currentColor = getCurrentColor();

    if (!drawingState.isDrawing) return;
    if (currentTool !== 'pencil' && currentTool !== 'eraser') return;

    if (currentTool === 'eraser') {
        currentColor = '#ffffff';
    }

    let x1 = Math.floor(drawingState.x0 / pixelWidth) * pixelWidth;
    let y1 = Math.floor(drawingState.y0 / pixelHeight) * pixelHeight;

    const x2 = Math.floor(e.offsetX / pixelWidth) * pixelWidth;
    const y2 = Math.floor(e.offsetY / pixelHeight) * pixelHeight;

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? pixelWidth : -pixelWidth;
    const sy = (y1 < y2) ? pixelHeight : -pixelHeight;
    let err = dx - dy;

    ctx.fillStyle = currentColor;

    while (!((x1 === x2) && (y1 === y2))) {
        const e2 = 2 * err;

        ctx.fillRect(x1, y1, pixelWidth, pixelHeight);
        colors[y1 / pixelHeight][x1 / pixelWidth] = currentColor;
        setPixels(colors);

        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    drawingState.x0 = x1;
    drawingState.y0 = y1;
};
