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
        // проверяем что у фрейма настроена сетка
        if (node.layoutGrids.length > 0 && node.layoutGrids[0].pattern == 'GRID') {
            // если сетка есть, сохраняем ее в переменную gridSize
            gridSize = node.layoutGrids[0].sectionSize;
        }
    }
    // уточняем что внутри  фрейма есть дети
    if ("children" in node) {
        // запускаем цикл для каждого ребенка внутри фрейма
        for (const child of node.children) {
            // и для каждого ребенка вызываем нашу функцию
            child.y = getPosition(child.y, gridSize);
        }
    }
}
figma.closePlugin();
function getPosition(y, gridSize) {
    // сохраняем в переменную reminder остаток от деления отступа на размер сетки и заодно округляем значение до целого пикселя
    let remainder = Math.round(y) % gridSize;
    // проверяем делится ли отступ по высоте на размер сетки без остатка.
    if (remainder == 0) {
        // если делится, то возвращаем как есть
        return y;
        // если нет, решаем куда двигать вверх или вниз
    }
    else {
        // если остаток меньше или равен половине размера сетки, то возврашаем оступ минус остаток
        if (remainder <= gridSize / 2) {
            return y - remainder;
            // если нет, тогда прибавляем к отступу разницу между размером сетки и остатком
        }
        else {
            return y + (gridSize - remainder);
        }
    }
}
function setTime(node) {
    return __awaiter(this, void 0, void 0, function* () {
        // узнаем текущее время и сохраняем его в переменную time
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
        // находим первый тектовый блок, который называется Time
        let timeNode = node.findOne(n => n.name === "Time" && n.type === 'TEXT');
        // загружаем шрифт для текстового блока перед тем как его изменить
        yield figma.loadFontAsync(timeNode.fontName).then(() => {
            // меняем текст внутри текстового блока на текущее время
            timeNode.characters = time;
        });
    });
}
