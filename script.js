// ========================================
// CANVAS
// ========================================

const treeCanvas =
  document.getElementById("treeCanvas");

const treeCtx =
  treeCanvas.getContext("2d");


const petalCanvas =
  document.getElementById("petalCanvas");

const petalCtx =
  petalCanvas.getContext("2d");


// ========================================
// CONFIGURACIÓN
// ========================================

// Cantidad de flores.
//
// Ahora podemos usar muchas más porque
// no son elementos HTML individuales.

const FLOWER_COUNT = 7000;


// ========================================
// FLORES
// ========================================

let flowers = [];


// ========================================
// PETALOS
// ========================================

let petals = [];


// ========================================
// TAMAÑO DE PANTALLA
// ========================================

let width = window.innerWidth;
let height = window.innerHeight;

let pixelRatio =
  Math.min(
    window.devicePixelRatio || 1,
    2
  );


// ========================================
// AJUSTAR CANVAS
// ========================================

function resizeCanvas() {

  width = window.innerWidth;

  height = window.innerHeight;

  pixelRatio =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  // Árbol

  treeCanvas.width =
    width * pixelRatio;

  treeCanvas.height =
    height * pixelRatio;

  treeCanvas.style.width =
    width + "px";

  treeCanvas.style.height =
    height + "px";


  treeCtx.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );


  // Pétalos

  petalCanvas.width =
    width * pixelRatio;

  petalCanvas.height =
    height * pixelRatio;

  petalCanvas.style.width =
    width + "px";

  petalCanvas.style.height =
    height + "px";


  petalCtx.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);


// ========================================
// FORMA DEL CORAZÓN
// ========================================

function heartPoint(
  t,
  scale
) {

  const x =
    16 *
    Math.pow(
      Math.sin(t),
      3
    );


  const y =
    13 *
      Math.cos(t)

    - 5 *
      Math.cos(2 * t)

    - 2 *
      Math.cos(3 * t)

    - Math.cos(4 * t);


  return {

    x: x * scale,

    y: -y * scale

  };

}


// ========================================
// CREAR LAS FLORES
// ========================================

function generateFlowers() {

  flowers = [];


  // Adaptamos el tamaño del corazón
  // dependiendo del dispositivo.

  let heartScale;


  if (width <= 500) {

    heartScale =
      Math.min(
        10.5,
        width / 37
      );

  } else {

    heartScale =
      Math.min(
        14.5,
        width / 38
      );

  }


  for (
    let i = 0;
    i < FLOWER_COUNT;
    i++
  ) {

    // Ángulo aleatorio

    const angle =
      Math.random() *
      Math.PI *
      2;


    // Distribución dentro del corazón

    const distance =
      Math.pow(
        Math.random(),
        0.75
      ) *
      heartScale;


    const point =
      heartPoint(
        angle,
        distance
      );


    // Pequeña variación

    const x =
      point.x +
      (
        Math.random() - 0.5
      ) * 3;


    const y =
      point.y +
      (
        Math.random() - 0.5
      ) * 3;


    // Tamaño

    let size;

    const random =
      Math.random();


    if (random < 0.08) {

      size =
        17 +
        Math.random() * 5;

    }

    else if (random < 0.25) {

      size =
        7 +
        Math.random() * 4;

    }

    else {

      size =
        10 +
        Math.random() * 7;

    }


    flowers.push({

      x,
      y,
      size,

      rotation:
        Math.random() *
        Math.PI *
        2,

      delay:
        500 +
        (
          i /
          FLOWER_COUNT
        ) * 4000

    });

  }

}


// ========================================
// GENERAR PETALOS
// ========================================

function generatePetals() {

  petals = [];


  const amount =
    width < 600
      ? 22
      : 35;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    petals.push({

      x:
        Math.random() *
        width,

      y:
        Math.random() *
        height,

      size:
        2 +
        Math.random() * 4,

      speed:
        0.25 +
        Math.random() * 0.8,

      drift:
        (
          Math.random() - 0.5
        ) * 0.35

    });

  }

}


// ========================================
// TRONCO
// ========================================

function drawTrunk(
  progress
) {

  const centerX =
    width / 2;


  const treeHeight =
    Math.min(
      760,
      height * 0.88
    );


  const trunkHeight =
    treeHeight * 0.43;


  const trunkWidth =
    width < 600
      ? 48
      : 62;


  const bottom =
    height / 2 +
    treeHeight / 2;


  const top =
    bottom -
    trunkHeight *
    progress;


  treeCtx.save();


  treeCtx.beginPath();


  treeCtx.moveTo(
    centerX -
    trunkWidth * 0.19,
    top
  );


  treeCtx.lineTo(
    centerX +
    trunkWidth * 0.32,
    top
  );


  treeCtx.lineTo(
    centerX +
    trunkWidth / 2,
    bottom
  );


  treeCtx.lineTo(
    centerX -
    trunkWidth / 2,
    bottom
  );


  treeCtx.closePath();


  const gradient =
    treeCtx.createLinearGradient(
      centerX -
        trunkWidth / 2,
      0,
      centerX +
        trunkWidth / 2,
      0
    );


  gradient.addColorStop(
    0,
    "#653316"
  );


  gradient.addColorStop(
    0.45,
    "#a65b28"
  );


  gradient.addColorStop(
    1,
    "#713817"
  );


  treeCtx.fillStyle =
    gradient;


  treeCtx.fill();


  // Detalle del tronco

  treeCtx.beginPath();


  treeCtx.ellipse(
    centerX -
      trunkWidth * 0.18,
    top +
      trunkHeight * 0.4,
    4,
    trunkHeight * 0.32,
    0,
    0,
    Math.PI * 2
  );


  treeCtx.fillStyle =
    "rgba(255,255,255,0.09)";


  treeCtx.fill();


  treeCtx.restore();

}


// ========================================
// DIBUJAR UNA FLOR
// ========================================

function drawFlower(
  flower,
  progress
) {

  if (
    progress <= flower.delay
  ) {

    return;

  }


  const appear =
    Math.min(
      1,
      (
        progress -
        flower.delay
      ) / 700
    );


  const scale =
    appear;


  const centerX =
    width / 2;


  const centerY =
    height / 2 -
    height * 0.08;


  const x =
    centerX +
    flower.x;


  const y =
    centerY +
    flower.y;


  treeCtx.save();


  treeCtx.translate(
    x,
    y
  );


  treeCtx.rotate(
    flower.rotation
  );


  treeCtx.scale(
    scale,
    scale
  );


  const radius =
    flower.size / 2;


  // ======================================
  // PETALOS
  // ======================================

  treeCtx.beginPath();


  for (
    let i = 0;
    i < 10;
    i++
  ) {

    const angle =
      (
        Math.PI * 2 / 10
      ) * i;


    const petalX =
      Math.cos(angle) *
      radius *
      0.72;


    const petalY =
      Math.sin(angle) *
      radius *
      0.72;


    treeCtx.moveTo(
      petalX,
      petalY
    );


    treeCtx.arc(
      petalX,
      petalY,
      radius * 0.48,
      0,
      Math.PI * 2
    );

  }


  treeCtx.fillStyle =
    "#ffe64c";


  treeCtx.fill();


  // ======================================
  // CENTRO
  // ======================================

  treeCtx.beginPath();


  treeCtx.arc(
    0,
    0,
    radius * 0.30,
    0,
    Math.PI * 2
  );


  treeCtx.fillStyle =
    "#5a3a08";


  treeCtx.fill();


  // ======================================
  // BRILLO DEL CENTRO
  // ======================================

  treeCtx.beginPath();


  treeCtx.arc(
    -radius * 0.08,
    -radius * 0.08,
    radius * 0.10,
    0,
    Math.PI * 2
  );


  treeCtx.fillStyle =
    "#ffe98a";


  treeCtx.fill();


  treeCtx.restore();

}


// ========================================
// ANIMACIÓN DEL ÁRBOL
// ========================================

const startTime =
  performance.now();


function animateTree(
  currentTime
) {

  const elapsed =
    currentTime -
    startTime;


  treeCtx.clearRect(
    0,
    0,
    width,
    height
  );


  // ======================================
  // APARICION DEL TRONCO
  // ======================================

  const trunkProgress =
    Math.min(
      1,
      elapsed / 1800
    );


  drawTrunk(
    trunkProgress
  );


  // ======================================
  // FLORES
  // ======================================

  for (
    const flower of flowers
  ) {

    drawFlower(
      flower,
      elapsed
    );

  }


  requestAnimationFrame(
    animateTree
  );

}


// ========================================
// ANIMACIÓN DE PETALOS
// ========================================

function animatePetals() {

  petalCtx.clearRect(
    0,
    0,
    width,
    height
  );


  for (
    const petal of petals
  ) {

    petal.y +=
      petal.speed;


    petal.x +=
      petal.drift;


    if (
      petal.y >
      height + 10
    ) {

      petal.y = -10;


      petal.x =
        Math.random() *
        width;

    }


    petalCtx.beginPath();


    petalCtx.arc(
      petal.x,
      petal.y,
      petal.size,
      0,
      Math.PI * 2
    );


    petalCtx.fillStyle =
      "rgba(247, 193, 0, .65)";


    petalCtx.fill();

  }


  requestAnimationFrame(
    animatePetals
  );

}


// ========================================
// INICIAR
// ========================================

generateFlowers();

generatePetals();

animateTree(
  performance.now()
);

animatePetals();
