for (const node of figma.currentPage.selection) {

  setTime(node)
  // добавляем значение по умолчанию 
  let gridSize = 4
  // проеряем что у нас выбран именно фрейм
  if (node.type == 'FRAME') {
    // проверяем что у фрейма настроена сетка
    if (node.layoutGrids.length > 0 && node.layoutGrids[0].pattern == 'GRID') {
      // если сетка есть, сохраняем ее в переменную gridSize
      gridSize = node.layoutGrids[0].sectionSize
    }
  }

  // уточняем что внутри  фрейма есть дети
  if ("children" in node) {
    // запускаем цикл для каждого ребенка внутри фрейма
    for (const child of node.children) {
      // и для каждого ребенка вызываем нашу функцию
      child.x = getPosition(child.x, gridSize);
      child.y = getPosition(child.y, gridSize);
    }
  }
}
figma.closePlugin();




function getPosition(coord, gridSize) {
  // сохраняем в переменную reminder остаток от деления отступа на размер сетки и заодно округляем значение до целого пикселя
  let remainder = Math.round(coord) % gridSize
  // проверяем делится ли отступ по высоте на размер сетки без остатка.
  if (remainder == 0) {
    // если делится, то возвращаем как есть
    return coord
    // если нет, решаем куда двигать вверх или вниз
  } else {
    // если остаток меньше или равен половине размера сетки, то возврашаем оступ минус остаток
    if (remainder <= gridSize / 2) {
      return coord - remainder
      // если нет, тогда прибавляем к отступу разницу между размером сетки и остатком
    } else {
      return coord + (gridSize - remainder)
    }
  }
}

//вычисляем время и добавляем нули, чтобы получать 08:01 вместо 8:1
function getTimeWithNulls(){
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  var hoursString = hours.toString();
  var minutesString = minutes.toString();
  //добавляем "0" к часам, если число меньше 10
  if (hours < 10){
    hoursString = "0" + hoursString;
  }
  //аналогично к минутам
  if (minutes < 10){
    minutesString = "0" + minutesString;
  }
  //возвращаем конкатенацию часов и минут с символом ":"
  return hoursString + ":" + minutesString;
}

async function setTime(node) {
  let timeNode = node.findOne(n => n.name === "Time" && n.type === 'TEXT');
  await figma.loadFontAsync(timeNode.fontName).then(() => {
    timeNode.characters = getTimeWithNulls();
  })
}
