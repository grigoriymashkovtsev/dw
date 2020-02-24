for (const node of figma.currentPage.selection) {

  setTime(node)


  // добавляем значение по умолчанию 
  let gridSize = 4



  // проеряем что у нас выбран именно фрейм
  if (node.type == 'FRAME') {
    // проверяем что у фрейма настроеа сетка
    if (node.layoutGrids.length > 0 && node.layoutGrids[0].pattern == 'GRID') {
      gridSize = node.layoutGrids[0].sectionSize

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
    return y
  } else return getPosition(y + 1, gridSize);

}







async function setTime(node) {


  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();


  console.log(time);


  let timeNode = node.findOne(n => n.name === "Time" && n.type === 'TEXT');

  console.log(timeNode)


  await figma.loadFontAsync(timeNode.fontName).then(() => {
    timeNode.characters = time
  })


}