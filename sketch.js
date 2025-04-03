let seaweeds = []; // 儲存水草的資料

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布為螢幕大小
  background(0); // 設置背景為黑色

  // 定義 4 種柔和且更透明的顏色
  let colors = [
    [34, 139, 34, 100],   // 森林綠，透明度更低
    [46, 139, 87, 100],   // 海洋綠，透明度更低
    [32, 178, 170, 100],  // 淺海綠，透明度更低
    [107, 142, 35, 100]   // 橄欖褐綠，透明度更低
  ];

  // 初始化 40 條水草，避免分布過於密集
  let spacing = width / 40; // 計算每條水草的間隔
  for (let i = 0; i < 40; i++) {
    let x = i * spacing + random(-spacing / 4, spacing / 4); // 在間隔範圍內隨機分布
    let height = random(40, 200); // 隨機設定水草的高度
    let frequency = random(0.03, 0.08); // 隨機設定搖晃頻率
    let color = random(colors); // 隨機選擇一種顏色
    seaweeds.push({ x, height, frequency, color }); // 將水草的資料存入陣列
  }

  // 創建 iframe，設置寬高為視窗的 60%
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.6, windowHeight * 0.6);
  iframe.position(windowWidth * 0.2, windowHeight * 0.2); // 將 iframe 放置在視窗中間
}

function draw() {
  background(0); // 設置背景為黑色

  strokeWeight(20); // 設置線條粗細為 20
  blendMode(BLEND); // 設置混合模式為 BLEND

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    stroke(seaweed.color); // 設置水草的顏色（包含透明度）
    noFill(); // 不填充，只繪製線條
    beginShape(); // 開始繪製水草形狀
    let segments = 20; // 將水草分為 20 段
    let segmentHeight = seaweed.height / segments; // 每段的高度
    let baseX = seaweed.x; // 水草的基準 X 座標
    let currentX = baseX; // 當前段的 X 座標
    let currentY = height; // 當前段的 Y 座標

    for (let i = 0; i <= segments; i++) {
      // 使用每條水草的頻率計算搖晃幅度
      let sway = sin(frameCount * seaweed.frequency - i * 0.2) * (segments - i) * 0.5; // 搖晃幅度越靠近底部越小
      let nextX = baseX + sway; // 計算下一段的 X 座標
      let nextY = currentY - segmentHeight; // 計算下一段的 Y 座標
      vertex(nextX, nextY); // 添加頂點
      currentX = nextX; // 更新當前段的 X 座標
      currentY = nextY; // 更新當前段的 Y 座標
    }
    endShape(); // 結束繪製水草形狀，但不封閉
  }
}





