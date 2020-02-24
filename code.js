var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
for (const node of figma.currentPage.selection) {
    setTime(node);
    // добавляем значение по умолчанию 
    let gridSize = 4;
    // проеряем что у нас выбран именно фрейм
    if (node.type == 'FRAME') {
        // проверяем что у фрейма настроеа сетка
        if (node.layoutGrids.length > 0 && node.layoutGrids[0].pattern == 'GRID') {
            gridSize = node.layoutGrids[0].sectionSize;
        }
    }
    if ("children" in node) {
        for (const child of node.children) {
            // console.log(getPosition(child.y, gridSize));
            child.y = getPosition(child.y, gridSize);
        }
    }
}
figma.closePlugin();
function getPosition(y, gridSize) {
    // console.log(y % gridSize);
    if (y % gridSize == 0) {
        return y;
    }
    else
        return getPosition(y + 1, gridSize);
}
function setTime(node) {
    return __awaiter(this, void 0, void 0, function* () {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
        console.log(time);
        let timeNode = node.findOne(n => n.name === "Time" && n.type === 'TEXT');
        console.log(timeNode);
        yield figma.loadFontAsync(timeNode.fontName).then(() => {
            timeNode.characters = time;
        });
    });
}
