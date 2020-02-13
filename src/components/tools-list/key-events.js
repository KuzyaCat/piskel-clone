import { setCurrentTool } from './current-tool';
import clearCanvas from '../../screens/canvas/drawing/clear-canvas';

const initKeyEvents = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === localStorage.getItem('pencil-sc')) {
            setCurrentTool('pencil');
        }
        if (e.key === localStorage.getItem('paint-bucket-sc')) {
            setCurrentTool('bucket');
        }
        if (e.key === localStorage.getItem('pippete-sc')) {
            setCurrentTool('pipette');
        }

        if (e.key === localStorage.getItem('eraser-sc')) {
            setCurrentTool('eraser');
        }

        if (e.key === localStorage.getItem('clear-canvas-sc')) {
            clearCanvas();
        }
    });
};

export default initKeyEvents;
