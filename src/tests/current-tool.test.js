import { getCurrentTool } from '../components/tools-list/current-tool';
import LocalStorageMock from './__mocks__/localstorage';

global.localStorage = new LocalStorageMock();

describe('Gets current tool', () => {
    test('Must be pencil', () => {
        localStorage.setItem('current-tool', 'pencil');
        expect(getCurrentTool()).toBe('pencil');
    });
    test('Must be eraser', () => {
        localStorage.setItem('current-tool', 'eraser');
        expect(getCurrentTool()).toBe('eraser');
    });
    test('Must be bucket', () => {
        localStorage.setItem('current-tool', 'bucket');
        expect(getCurrentTool()).toBe('bucket');
    });
    test('Must be pippete', () => {
        localStorage.setItem('current-tool', 'pippete');
        expect(getCurrentTool()).toBe('pippete');
    });
    test('Must be stroke', () => {
        localStorage.setItem('current-tool', 'stroke');
        expect(getCurrentTool()).toBe('stroke');
    });
});
