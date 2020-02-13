import { setCurrentFrame } from './current-frame';
import { getPixelSize } from '../../screens/canvas/drawing/pixels';
import updatePreview from '../../screens/preview/preview';
import setFPS from '../../screens/preview/fps';

const updateControls = () => {
    const frameControls = document.querySelectorAll('.frames--controls')[0];
    const frameControlsItems = document.querySelectorAll('.frames--controls--item');

    for (let i = 0; i < frameControlsItems.length; i += 1) {
        frameControls.removeChild(frameControlsItems[i]);
    }

    const frameItems = document.querySelectorAll('.frames--item');

    for (let i = 0; i < frameItems.length; i += 1) {
        const frameControlsItem = document.createElement('div');
        frameControlsItem.classList.add('frames--controls--item');

        const deleteBtn = document.createElement('img');
        deleteBtn.src = './images/trash-alt-solid.svg';
        deleteBtn.classList.add('delete');
        deleteBtn.alt = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            const deleteBtns = document.querySelectorAll('.delete');
            let elementIndex = -1;
            for (let j = 0; j < deleteBtns.length; j += 1) {
                if (deleteBtns[j] === e.target) {
                    elementIndex = j;
                    break;
                }
            }
            deleteFrame(elementIndex);
        });

        const copyBtn = document.createElement('img');
        copyBtn.src = './images/copy-solid.svg';
        copyBtn.classList.add('copy');
        copyBtn.alt = 'Copy';
        copyBtn.addEventListener('click', (e) => {
            const copyBtns = document.querySelectorAll('.copy');
            let elementIndex = -1;
            for (let j = 0; j < copyBtns.length; j += 1) {
                if (copyBtns[j] === e.target) {
                    elementIndex = j;
                    break;
                }
            }
            copyFrame(elementIndex);
        });

        frameControlsItem.setAttribute('style', `top: ${i * 143 + 3}px`);
        frameControlsItem.appendChild(deleteBtn);
        frameControlsItem.appendChild(copyBtn);
        frameControls.appendChild(frameControlsItem);
    }
};

export const addFrame = () => {
    const frames = JSON.parse(localStorage.getItem('frames')) || [];

    const framesContainer = document.querySelectorAll('.frames--list')[0];
    const newFrameEl = document.createElement('canvas');
    newFrameEl.width = 128;
    newFrameEl.height = 128;
    newFrameEl.classList.add('frames--item');
    newFrameEl.draggable = true;
    newFrameEl.addEventListener('click', (e) => {
        const elements = document.querySelectorAll('.frames--item');
        let elementIndex = -1;
        for (let i = 0; i < elements.length; i += 1) {
            if (elements[i] === e.target) {
                elementIndex = i;
                break;
            }
        }
        if (!newFrameEl.classList.contains('current_frame')) {
            setCurrentFrame(elementIndex, true);
        }
    });
    moveFrame(newFrameEl);
    framesContainer.appendChild(newFrameEl);

    const frameItems = document.querySelectorAll('.frames--item');
    if (frameItems.length > 1) {
        updateControls();
    }

    const newFrame = [];
    const canvas = document.getElementById('canvas');
    const pixelSizes = getPixelSize();
    for (let i = 0; i < canvas.height / pixelSizes[1]; i += 1) {
        const row = [];
        for (let j = 0; j < canvas.width / pixelSizes[0]; j += 1) {
            row.push('#ffffff');
        }
        newFrame.push(row);
    }
    frames.push(newFrame);
    localStorage.setItem('frames', JSON.stringify(frames));
    setCurrentFrame(frames.length - 1, true);

    const fps = +localStorage.getItem('fps');
    setFPS(fps);
    updatePreview(fps);
};

export const deleteFrame = (index) => {
    const frames = JSON.parse(localStorage.getItem('frames'));

    const framesContainer = document.querySelectorAll('.frames--list')[0];
    const frameItems = document.querySelectorAll('.frames--item');

    const frameControls = document.querySelectorAll('.frames--controls')[0];
    const frameControlsItems = document.querySelectorAll('.frames--controls--item');

    frames.splice(index, 1);
    framesContainer.removeChild(frameItems[index]);
    if (frameControlsItems.length <= 2) {
        for (const item of frameControlsItems) {
            frameControls.removeChild(item);
        }

        const frameControlsItem = document.createElement('div');
        frameControlsItem.classList.add('frames--controls--item');
        frameControlsItem.setAttribute('style', 'top: 3px');

        const copyBtn = document.createElement('img');
        copyBtn.src = './images/copy-solid.svg';
        copyBtn.classList.add('copy');
        copyBtn.alt = 'Copy';
        copyBtn.addEventListener('click', (e) => {
            const copyBtns = document.querySelectorAll('.copy');
            let elementIndex = -1;
            for (let j = 0; j < copyBtns.length; j += 1) {
                if (copyBtns[j] === e.target) {
                    elementIndex = j;
                    break;
                }
            }
            copyFrame(elementIndex);
        });

        frameControlsItem.appendChild(copyBtn);
        frameControls.appendChild(frameControlsItem);
    } else {
        frameControls.removeChild(frameControlsItems[index]);
    }

    for (let i = index; i < frameControlsItems.length; i += 1) {
        const positionTopValue = +frameControlsItems[i].style.top.replace('px', '');
        frameControlsItems[i].setAttribute('style', `top: ${positionTopValue - 143 - 3 * (i - index - 1)}px`);
    }

    localStorage.setItem('frames', JSON.stringify(frames));

    if (index === 0) {
        setCurrentFrame(index, true);
    } else {
        setCurrentFrame(index - 1, true);
    }

    const fps = +localStorage.getItem('fps');
    setFPS(fps);
    updatePreview(fps);
};

export const copyFrame = (index) => {
    const framesContainer = document.querySelectorAll('.frames--list')[0];
    const newFrameEl = document.createElement('canvas');
    newFrameEl.width = 128;
    newFrameEl.height = 128;
    newFrameEl.classList.add('frames--item');
    newFrameEl.addEventListener('click', (e) => {
        const elements = document.querySelectorAll('.frames--item');
        let elementIndex = -1;
        for (let i = 0; i < elements.length; i += 1) {
            if (elements[i] === e.target) {
                elementIndex = i;
                break;
            }
        }
        if (!newFrameEl.classList.contains('current_frame')) {
            setCurrentFrame(elementIndex, true);
        }
    });
    const beforeFrameEl = document.querySelectorAll('.frames--item')[index];
    framesContainer.insertBefore(newFrameEl, beforeFrameEl.nextSibling);

    updateControls();

    const frames = JSON.parse(localStorage.getItem('frames')) || [];

    const canvas = document.getElementById('canvas');
    const pixelSizes = getPixelSize();
    const pixelWidth = pixelSizes[0];
    const pixelHeight = pixelSizes[1];
    const framePixelWidth = (128 / canvas.width) * pixelWidth;
    const framePixelHeight = (128 / canvas.height) * pixelHeight;

    const frameColors = frames[index];
    const newFrame = [];

    const currentFrame = document.querySelectorAll('.frames--item')[index + 1];
    const ctx = currentFrame.getContext('2d');
    for (let i = 0; i < 128 / framePixelHeight; i += 1) {
        const row = [];
        for (let j = 0; j < 128 / framePixelWidth; j += 1) {
            ctx.fillStyle = frameColors[i][j];
            ctx.fillRect(j * framePixelWidth, i * framePixelHeight,
                framePixelWidth, framePixelHeight);
            row.push(frameColors[i][j]);
        }
        newFrame.push(row);
    }
    frames.splice(index + 1, 0, newFrame);
    localStorage.setItem('frames', JSON.stringify(frames));
    setCurrentFrame(index + 1, true);

    const fps = +localStorage.getItem('fps');
    setFPS(fps);
    updatePreview(fps);
};

let lastIndex = -1;

export const moveFrame = (item) => {
    item.addEventListener('dragstart', (event) => {
        event.target.border = '1px solid yellow';
        const elements = document.querySelectorAll('.frames--item');
        for (let i = 0; i < elements.length; i += 1) {
            if (elements[i] === event.target) {
                lastIndex = i;
                break;
            }
        }
    });
    item.addEventListener('dragenter', (event) => {
        event.target.setAttribute('style', 'border: 1px solid yellow');
        const framesContainer = document.querySelectorAll('.frames--list')[0];
        const frameItems = document.querySelectorAll('.frames--item');
        const frameControls = document.querySelectorAll('.frames--controls')[0];
        const frameControlsItems = document.querySelectorAll('.frames--controls--item');

        let elementIndex = -1;
        for (let i = 0; i < frameItems.length; i += 1) {
            if (frameItems[i] === event.target) {
                elementIndex = i;
                break;
            }
        }

        if (elementIndex === lastIndex) {
            return;
        }

        const currentFrameItem = frameItems[lastIndex];
        const currentFrameControlsItem = frameControlsItems[lastIndex];
        const enterFrameItem = frameItems[elementIndex];
        const enterFrameControlsItem = frameControlsItems[elementIndex];
        framesContainer.removeChild(currentFrameItem);
        frameControls.removeChild(currentFrameControlsItem);
        if (lastIndex < elementIndex) {
            if (elementIndex === frameItems.length - 1) {
                framesContainer.appendChild(currentFrameItem);
                frameControls.appendChild(currentFrameControlsItem);
            } else {
                framesContainer.insertBefore(currentFrameItem,
                    enterFrameItem.nextSibling || enterFrameItem);
                frameControls.insertBefore(currentFrameControlsItem,
                    enterFrameControlsItem.nextSibling || enterFrameItem.nextSibling);
            }
        } else {
            if (elementIndex === 0) {
                framesContainer.insertBefore(currentFrameItem, enterFrameItem);
                frameControls.appendChild(currentFrameControlsItem, enterFrameControlsItem);
            } else {
                framesContainer.insertBefore(currentFrameItem,
                    enterFrameItem.nextSibling || enterFrameItem);
                frameControls.insertBefore(currentFrameControlsItem,
                    enterFrameControlsItem.nextSibling || enterFrameItem.nextSibling);
            }
            framesContainer.insertBefore(currentFrameItem,
                enterFrameItem.previousSibling || enterFrameItem);
            frameControls.insertBefore(currentFrameControlsItem,
                enterFrameControlsItem.previousSibling);
        }
        updateControls();

        const frames = JSON.parse(localStorage.getItem('frames'));
        const temp = frames[lastIndex];
        frames[lastIndex] = frames[elementIndex];
        frames[elementIndex] = temp;
        localStorage.setItem('frames', JSON.stringify(frames));
        lastIndex = elementIndex;
    }, false);
    item.addEventListener('dragleave', (event) => {
        event.target.setAttribute('style', 'border: 1px solid rgba(0, 0, 0, 0.541327)');
    }, false);
    item.addEventListener('dragend', (event) => {
        event.target.setAttribute('style', 'border: 1px solid rgba(0, 0, 0, 0.541327)');
        setCurrentFrame(lastIndex, true);
    });

    const fps = +localStorage.getItem('fps');
    setFPS(fps);
    updatePreview(fps);
};
