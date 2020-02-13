import { setCurrentFrame, getCurrentFrameIndex } from './current-frame';
import { setFrameData, getPixels } from '../../screens/canvas/drawing/pixels';
import { deleteFrame, copyFrame } from './frame-actions';

const updateControls = () => {
    const frameItems = document.querySelectorAll('.frames--item');

    if (frameItems.length === 1) {
        const frameControls = document.querySelectorAll('.frames--controls')[0];
        const frameControlsItem = document.createElement('div');
        frameControlsItem.classList.add('frames--controls--item');

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

        frameControlsItem.setAttribute('style', 'top: 3px');
        frameControlsItem.appendChild(copyBtn);
        frameControls.appendChild(frameControlsItem);
    }

    if (frameItems.length > 1) {
        const frameControls = document.querySelectorAll('.frames--controls')[0];

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
    }
};

const initFrames = () => {
    const frames = JSON.parse(localStorage.getItem('frames')) || [];

    if (frames.length === 0) {
        setFrameData(getPixels(), true);
        updateControls();
        return;
    }

    const framesContainer = document.querySelectorAll('.frames--list')[0];

    for (let i = 1; i < frames.length; i += 1) {
        const newFrameEl = document.createElement('canvas');
        newFrameEl.width = 128;
        newFrameEl.height = 128;
        newFrameEl.classList.add('frames--item');
        newFrameEl.draggable = true;
        framesContainer.appendChild(newFrameEl);
    }

    const frameItems = document.querySelectorAll('.frames--item');
    for (let key = 0; key < frameItems.length; key += 1) {
        const ctx = frameItems[key].getContext('2d');

        const frameColors = frames[key];

        if (frameColors.length === 0) {
            for (let i = 0; i < 128; i += 1) {
                const row = [];
                for (let j = 0; j < 128; j += 1) {
                    row.push('#ffffff');
                }
                frameColors.push(row);
            }
        } else {
            for (let i = 0; i < frameColors.length; i += 1) {
                for (let j = 0; j < frameColors[i].length; j += 1) {
                    const framePixelWidth = 128 / frameColors[i].length;
                    const framePixelHeight = 128 / frameColors.length;
                    if (frameColors[i][j] !== 0) {
                        ctx.fillStyle = frameColors[i][j];
                        ctx.fillRect(j * framePixelWidth, i * framePixelHeight,
                            framePixelWidth, framePixelHeight);
                    }
                }
            }
        }
    }

    updateControls();

    setCurrentFrame(getCurrentFrameIndex(), true);
};

export default initFrames;
