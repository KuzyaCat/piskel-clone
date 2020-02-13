import { getPixelSize } from '../screens/canvas/drawing/pixels';
import LocalStorageMock from './__mocks__/localstorage';

global.localStorage = new LocalStorageMock();

describe('Gets pixel size', () => {
    test('Width must be 4', () => {
        localStorage.setItem('pixelWidth', 4);
        expect(getPixelSize()[0]).toBe(4);
    });
    test('Height must be 4', () => {
        localStorage.setItem('pixelHeight', 4);
        expect(getPixelSize()[1]).toBe(4);
    });
    test('Width must be 8', () => {
        localStorage.setItem('pixelWidth', 8);
        expect(getPixelSize()[0]).toBe(8);
    });
    test('Height must be 8', () => {
        localStorage.setItem('pixelHeight', 8);
        expect(getPixelSize()[1]).toBe(8);
    });
    test('Width must be 16', () => {
        localStorage.setItem('pixelWidth', 16);
        expect(getPixelSize()[0]).toBe(16);
    });
    test('Height must be 16', () => {
        localStorage.setItem('pixelHeight', 16);
        expect(getPixelSize()[1]).toBe(16);
    });
});
