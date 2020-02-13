export const getCurrentTool = () => {
    const currentTool = localStorage.getItem('current-tool') || 'pencil';
    return currentTool;
};

export const setCurrentTool = (newTool) => {
    const tools = document.getElementsByClassName('tool');
    for (const item of tools) {
        item.classList.remove('current');
    }

    localStorage.setItem('current-tool', newTool);
    document.getElementById(`${newTool}`).classList.add('current');
};
