import { drawingState, draw } from './drawing/draw';
import { getCurrentTool } from '../../components/tools-list/current-tool';
import {
    getPixels, setPixels, getPixelSize, setFrameData,
} from './drawing/pixels';
import { getCurrentColor } from '../../components/colors-list/current-color';
import colorPicker from '../../components/tools-list/pipette';
import paintBucket from '../../components/tools-list/paint-bucket';

const initCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    let currentTool = getCurrentTool();
    let pixelSizes = getPixelSize();
    let pixelWidth = pixelSizes[0];
    let pixelHeight = pixelSizes[1];
    const currentColor = getCurrentColor();

    let colors = getPixels();

    if (colors.length === 0) {
        for (let i = 0; i < canvas.height / pixelHeight; i += 1) {
            const row = [];
            for (let j = 0; j < canvas.width / pixelWidth; j += 1) {
                row.push('#ffffff');
            }
            colors.push(row);
        }
    } else {
        for (let i = 0; i < colors.length; i += 1) {
            for (let j = 0; j < colors[i].length; j += 1) {
                if (colors[i][j] !== 0) {
                    ctx.fillStyle = colors[i][j];
                    ctx.fillRect(j * pixelWidth, i * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }
    }
    setFrameData(colors);

    canvas.addEventListener('mousedown', (e) => {
        currentTool = getCurrentTool();

        pixelSizes = getPixelSize();
        pixelWidth = pixelSizes[0];
        pixelHeight = pixelSizes[1];

        if (currentTool !== 'pencil' && currentTool !== 'eraser') return;

        drawingState.isDrawing = true;

        drawingState.x0 = Math.floor(e.offsetX / pixelWidth) * pixelWidth;
        drawingState.y0 = Math.floor(e.offsetY / pixelHeight) * pixelHeight;

        colors = getPixels();
        if (currentTool === 'eraser') {
            colors[drawingState.y0 / pixelHeight][drawingState.x0 / pixelWidth] = '#ffffff';
        } else {
            colors[drawingState.y0 / pixelHeight][drawingState.x0 / pixelWidth] = currentColor;
        }
        setPixels(colors, true);
    });

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', () => {
        drawingState.isDrawing = false;
        drawingState.x0 = 0;
        drawingState.y0 = 0;
    });

    canvas.addEventListener('mouseout', () => {
        drawingState.isDrawing = false;
        drawingState.x0 = 0;
        drawingState.y0 = 0;
    });

    canvas.addEventListener('click', (e) => {
        currentTool = getCurrentTool();

        if (currentTool === 'pipette') {
            const x = Math.floor(e.offsetX / pixelWidth);
            const y = Math.floor(e.offsetY / pixelHeight);
            colorPicker(x, y);
            return;
        }

        if (currentTool === 'bucket') {
            const x = Math.floor(e.offsetX / pixelWidth);
            const y = Math.floor(e.offsetY / pixelHeight);
            paintBucket(x, y);
            return;
        }

        if (currentTool === 'pencil') {
            drawingState.isDrawing = true;
            pixelSizes = getPixelSize();
            pixelWidth = pixelSizes[0];
            pixelHeight = pixelSizes[1];
            drawingState.x0 = Math.floor(e.offsetX / pixelWidth) * pixelWidth;
            drawingState.y0 = Math.floor(e.offsetY / pixelHeight) * pixelHeight;
            ctx.fillStyle = currentColor;
            ctx.fillRect(drawingState.x0, drawingState.y0, pixelWidth, pixelHeight);
            colors = getPixels();
            colors[drawingState.y0 / pixelHeight][drawingState.x0 / pixelWidth] = currentColor;
            setPixels(colors, true);
            drawingState.isDrawing = false;
        }

        if (currentTool === 'eraser') {
            drawingState.isDrawing = true;
            pixelSizes = getPixelSize();
            pixelWidth = pixelSizes[0];
            pixelHeight = pixelSizes[1];
            drawingState.x0 = Math.floor(e.offsetX / pixelWidth) * pixelWidth;
            drawingState.y0 = Math.floor(e.offsetY / pixelHeight) * pixelHeight;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(drawingState.x0, drawingState.y0, pixelWidth, pixelHeight);
            colors = getPixels();
            colors[drawingState.y0 / pixelHeight][drawingState.x0 / pixelWidth] = '#ffffff';
            setPixels(colors, true);
            drawingState.isDrawing = false;
        }
    });
};

export default initCanvas;
