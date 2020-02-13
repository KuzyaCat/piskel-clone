import { getPenSize } from '../components/tools-list/pen-size';
import LocalStorageMock from './__mocks__/localstorage';

global.localStorage = new LocalStorageMock();

describe('Gets current pen size', () => {
    test('Must be 1', () => {
        localStorage.setItem('pen-size', 1);
        expect(getPenSize()).toBe(1);
    });

    test('Must be 2', () => {
        localStorage.setItem('pen-size', 2);
        expect(getPenSize()).toBe(2);
    });

    test('Must be 3', () => {
        localStorage.setItem('pen-size', 3);
        expect(getPenSize()).toBe(3);
    });

    test('Must be 4', () => {
        localStorage.setItem('pen-size', 4);
        expect(getPenSize()).toBe(4);
    });
});
