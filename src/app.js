import initCanvas from './screens/canvas/index';
import clearCanvas from './screens/canvas/drawing/clear-canvas';
import { setPixelSize } from './screens/canvas/drawing/pixels';
import { getCurrentColor, setCurrentColor } from './components/colors-list/current-color';
import { setCurrentTool, getCurrentTool } from './components/tools-list/current-tool';
import { getPrevColor, setPrevColor } from './components/colors-list/prev-color';
import { getPenSize, setPenSize } from './components/tools-list/pen-size';
import initKeyEvents from './components/tools-list/key-events';
import initFrames from './components/frames-list/init-frames';
import { setCurrentFrame } from './components/frames-list/current-frame';
import { addFrame, moveFrame } from './components/frames-list/frame-actions';
import updatePreview from './screens/preview/preview';
import setFPS from './screens/preview/fps';
import initFullscreenEvents from './screens/preview/fullscreen';
import { initModal, initShortcutBtns } from './components/modal-dialog/shortcuts';
import initGif from './screens/export/export-gif';

require('./screens/canvas/style.css');

require.context('./screens/canvas/images');

const init = () => {
    initModal();
    initShortcutBtns();

    document.getElementById('pencil').addEventListener('click', () => setCurrentTool('pencil'));
    document.getElementById('bucket').addEventListener('click', () => setCurrentTool('bucket'));
    document.getElementById('pipette').addEventListener('click', () => setCurrentTool('pipette'));
    document.getElementById('eraser').addEventListener('click', () => setCurrentTool('eraser'));
    setCurrentTool(getCurrentTool());

    initKeyEvents();

    initCanvas();

    initFrames();

    const fps = +localStorage.getItem('fps') || 1;
    setFPS(fps);
    document.getElementById('fps').value = fps;
    document.getElementById('fps').addEventListener('change', (e) => {
        setFPS(e.target.value);
        updatePreview(e.target.value);
    });
    updatePreview(fps);

    document.getElementById('export--gif').addEventListener('click', () => initGif());

    const frameItems = document.querySelectorAll('.frames--item');
    frameItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            const elements = document.querySelectorAll('.frames--item');
            let elementIndex = -1;
            for (let i = 0; i < elements.length; i += 1) {
                if (elements[i] === e.target) {
                    elementIndex = i;
                    break;
                }
            }
            if (!item.classList.contains('current_frame')) {
                setCurrentFrame(elementIndex, true);
            }
        });
        moveFrame(item);
    });

    initFullscreenEvents();

    document.getElementById('clear').addEventListener('click', clearCanvas);
    document.getElementById('size-big').addEventListener('click', () => {
        clearCanvas();
        setPixelSize(16, 16);
    });
    document.getElementById('size-medium').addEventListener('click', () => {
        clearCanvas();
        setPixelSize(8, 8);
    });
    document.getElementById('size-small').addEventListener('click', () => {
        clearCanvas();
        setPixelSize(4, 4);
    });

    setCurrentColor(getCurrentColor());
    setPrevColor(getPrevColor());
    let colorBeforeChange;
    const currentColorInput = document.getElementById('color-current');
    currentColorInput.addEventListener('click', () => {
        colorBeforeChange = getCurrentColor();
    });
    currentColorInput.addEventListener('change', (e) => {
        setCurrentColor(e.target.value);
        setPrevColor(colorBeforeChange);
    });
    const prevColorInput = document.getElementById('color-prev');
    prevColorInput.parentElement.addEventListener('click', () => {
        colorBeforeChange = getCurrentColor();
        setCurrentColor(prevColorInput.value);
        setPrevColor(colorBeforeChange);
    });

    setPenSize(getPenSize());
    document.querySelectorAll('.pen_size--item').forEach((item) => {
        item.addEventListener('click', () => setPenSize(+item.dataset.size));
    });

    document.querySelectorAll('.frames--add')[0].addEventListener('click', () => {
        addFrame();
    });
};

init();
