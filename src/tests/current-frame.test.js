import { getCurrentFrameIndex } from '../components/frames-list/current-frame';
import LocalStorageMock from './__mocks__/localstorage';

global.localStorage = new LocalStorageMock();

describe('Gets index of current frame', () => {
    test('Must be Infinity', () => {
        localStorage.setItem('current-frame', Infinity);
        expect(getCurrentFrameIndex()).toBe(Infinity);
    });
    test('Must be 0', () => {
        localStorage.setItem('current-frame', 0);
        expect(getCurrentFrameIndex()).toBe(0);
    });
    test('Must be 1', () => {
        localStorage.setItem('current-frame', 1);
        expect(getCurrentFrameIndex()).toBe(1);
    });
    test('Must be 10', () => {
        localStorage.setItem('current-frame', 10);
        expect(getCurrentFrameIndex()).toBe(10);
    });
    test('Must be 100', () => {
        localStorage.setItem('current-frame', 100);
        expect(getCurrentFrameIndex()).toBe(100);
    });
});
