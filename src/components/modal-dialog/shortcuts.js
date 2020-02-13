const initShortcutSettings = () => {
    let isPressing = false;

    document.getElementById('paint_bucket_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'paint_bucket_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('paint_bucket_sc').textContent = localStorage.getItem('paint-bucket-sc');
                e.stopPropagation();
            }
        });
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('paint_bucket_sc').textContent = localStorage.getItem('paint-bucket-sc');
        }
        document.getElementById('paint_bucket_sc').textContent = '';
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('paint-bucket-sc', e.key);
                document.getElementById('paint_bucket_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('pippete_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'pippete_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('pippete_sc').textContent = localStorage.getItem('pippete-sc');
                e.stopPropagation();
            }
        });
        document.getElementById('pippete_sc').textContent = '';
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('pippete_sc').textContent = localStorage.getItem('pippete-sc');
        }
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('pippete-sc', e.key);
                document.getElementById('pippete_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('pencil_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'pencil_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('pencil_sc').textContent = localStorage.getItem('pencil-sc');
                e.stopPropagation();
            }
        });
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('pencil_sc').textContent = localStorage.getItem('pencil-sc');
        }
        document.getElementById('pencil_sc').textContent = '';
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('pencil-sc', e.key);
                document.getElementById('pencil_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('stroke_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'stroke_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('stroke_sc').textContent = localStorage.getItem('stroke-sc');
                e.stopPropagation();
            }
        });
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('stroke_sc').textContent = localStorage.getItem('stroke-sc');
        }
        document.getElementById('stroke_sc').textContent = '';
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('stroke-sc', e.key);
                document.getElementById('stroke_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('eraser_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'eraser_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('eraser_sc').textContent = localStorage.getItem('eraser-sc');
                e.stopPropagation();
            }
        });
        document.getElementById('eraser_sc').textContent = '';
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('eraser_sc').textContent = localStorage.getItem('eraser-sc');
        }
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('eraser-sc', e.key);
                document.getElementById('eraser_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('clear_canvas_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'clear_canvas_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('clear_canvas_sc').textContent = localStorage.getItem('clear-canvas-sc');
                e.stopPropagation();
            }
        });
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('clear_canvas_sc').textContent = localStorage.getItem('clear-canvas-sc');
        }
        document.getElementById('clear_canvas_sc').textContent = '';
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('clear-canvas-sc', e.key);
                document.getElementById('clear_canvas_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
    document.getElementById('fullscreen_sc').addEventListener('click', () => {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'fullscreen_sc') {
                return;
            }
            if (isPressing) {
                isPressing = false;
                document.getElementById('fullscreen_sc').textContent = localStorage.getItem('fullscreen-sc');
                e.stopPropagation();
            }
        });
        if (!isPressing) {
            isPressing = true;
        } else {
            isPressing = false;
            document.getElementById('fullscreen_sc').textContent = localStorage.getItem('fullscreen-sc');
        }
        document.getElementById('fullscreen_sc').textContent = '';
        document.addEventListener('keydown', (e) => {
            if (isPressing) {
                localStorage.setItem('fullscreen-sc', e.key);
                document.getElementById('fullscreen_sc').textContent = e.key;
                isPressing = false;
            }
        });
    });
};

export const initModal = () => {
    const modal = document.getElementById('shortcuts');

    const btn = document.getElementById('shortcuts_btn');

    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function () {
        modal.style.display = 'block';
    };

    span.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        }
    });

    initShortcutSettings();
};

export const initShortcutBtns = () => {
    document.getElementById('paint_bucket_sc').textContent = localStorage.getItem('paint-bucket-sc') || 'b';
    if (document.getElementById('paint_bucket_sc').textContent === 'b') localStorage.setItem('paint-bucket-sc', 'b');

    document.getElementById('pippete_sc').textContent = localStorage.getItem('pippete-sc') || 'c';
    if (document.getElementById('pippete_sc').textContent === 'c') localStorage.setItem('pippete-sc', 'c');

    document.getElementById('pencil_sc').textContent = localStorage.getItem('pencil-sc') || 'p';
    if (document.getElementById('pencil_sc').textContent === 'p') localStorage.setItem('pencil-sc', 'p');

    document.getElementById('stroke_sc').textContent = localStorage.getItem('stroke-sc') || 's';
    if (document.getElementById('stroke_sc').textContent === 's') localStorage.setItem('stroke-sc', 's');

    document.getElementById('eraser_sc').textContent = localStorage.getItem('eraser-sc') || 'e';
    if (document.getElementById('eraser_sc').textContent === 'e') localStorage.setItem('eraser-sc', 'e');

    document.getElementById('clear_canvas_sc').textContent = localStorage.getItem('clear-canvas-sc') || 'Backspace';
    if (document.getElementById('clear_canvas_sc').textContent === 'Backspace') localStorage.setItem('clear-canvas-sc', 'Backspace');

    document.getElementById('fullscreen_sc').textContent = localStorage.getItem('fullscreen-sc') || 'Enter';
    if (document.getElementById('fullscreen_sc').textContent === 'Enter') localStorage.setItem('fullscreen-sc', 'Enter');
};
