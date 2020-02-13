import { getPixels } from '../../screens/canvas/drawing/pixels';
import { getCurrentColor, setCurrentColor } from '../colors-list/current-color';
import { setPrevColor } from '../colors-list/prev-color';

const colorPicket = (x, y) => {
    const colorBeforeChange = getCurrentColor();
    const colors = getPixels();
    if (colors[y][x] === 0) {
        setCurrentColor('#ffffff');
    } else setCurrentColor(colors[y][x]);
    setPrevColor(colorBeforeChange);
};

export default colorPicket;
