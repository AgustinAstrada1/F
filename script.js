// ========================================
// ELEMENTOS
// ========================================

const treeHeart =
  document.getElementById("treeHeart");


const canvas =
  document.getElementById("flowers");


const ctx =
  canvas.getContext("2d");


// ========================================
// CONFIGURACION
// ========================================

// Cantidad de flores

const FLOWER_COUNT = 3000;


// Tamaño del corazón

const HEART_SCALE = 14.5;


// ========================================
// FORMA DEL CORAZON
// ========================================

function heartPoint(
  t,
  scale = 1
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
// CREAR UNA FLOR
// ========================================

function createFlower(
  x,
  y,
  size,
  delay
) {

  const flower =
    document.createElement("span");


  flower.className =
    "flower";


  // ======================================
  // TAMAÑOS
  // ======================================

  if (size <= 11) {

    flower.classList.add(
      "small"
    );

  }

  else if (size >= 18) {

    flower.classList.add(
      "large"
    );

  }


  // ======================================
  // POSICION
  // ======================================

  flower.style.left =
    `calc(50% + ${x}px)`;


  flower.style.top =
    `calc(50% + ${y}px)`;


  // ======================================
  // TAMAÑO
  // ======================================

  flower.style.width =
    `${size}px`;


  flower.style.height =
    `${size}px`;


  // ======================================
  // RETRASO
  // ======================================

  flower.style.animationDelay =
    `${delay}s, ${delay + 0.8}s`;


  // ======================================
  // ROTACION INICIAL
  // ======================================

  flower.style.setProperty(
    "--rotation",
    `${Math.random() * 360}deg`
  );


  treeHeart.appendChild(
    flower
  );

}


// ========================================
// GENERAR FLORES
// ========================================

const flowers = [];


// ========================================
// GENERAMOS LOS PUNTOS
// ========================================

for (
  let i = 0;
  i < FLOWER_COUNT;
  i++
) {

  // Ángulo

  const angle =
    Math.random() *
    Math.PI *
    2;


  // Distribución interior

  const distance =
    Math.pow(
      Math.random(),
      0.75
    ) *
    HEART_SCALE;


  // Punto del corazón

  const point =
    heartPoint(
      angle,
      distance
    );


  // Pequeña irregularidad

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


  flowers.push({

    x: x,

    y: y

  });

}


// ========================================
// CREAR LAS FLORES
// ========================================
//
// Las creamos progresivamente.
//
// Esto hace que el árbol se forme
// delante de nuestros ojos.
//

flowers.forEach(
  (flower, index) => {

    let size;

    const random =
      Math.random();


    // ====================================
    // FLORES GRANDES
    // ====================================

    if (
      random < 0.08
    ) {

      size =
        17 +
        Math.random() * 5;

    }


    // ====================================
    // FLORES PEQUEÑAS
    // ====================================

    else if (
      random < 0.25
    ) {

      size =
        7 +
        Math.random() * 4;

    }


    // ====================================
    // FLORES NORMALES
    // ====================================

    else {

      size =
        10 +
        Math.random() * 7;

    }


    // ====================================
    // APARICION PROGRESIVA
    // ====================================
    //
    // Las primeras aparecen rápidamente.
    // Las últimas tardan un poco más.
    //

    const delay =
      1.2 +
      (index / FLOWER_COUNT) * 3.5;


    createFlower(
      flower.x,
      flower.y,
      size,
      delay
    );

  }
);


// ========================================
// PETALOS DEL FONDO
// ========================================

let petals = [];


// ========================================
// CONFIGURAR CANVAS
// ========================================

function resize() {

  const ratio =
    window.devicePixelRatio || 1;


  canvas.width =
    window.innerWidth *
    ratio;


  canvas.height =
    window.innerHeight *
    ratio;


  canvas.style.width =
    `${window.innerWidth}px`;


  canvas.style.height =
    `${window.innerHeight}px`;


  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

}


resize();


window.addEventListener(
  "resize",
  resize
);


// ========================================
// CREAR PETALOS
// ========================================

for (
  let i = 0;
  i < 35;
  i++
) {

  petals.push({

    x:
      Math.random() *
      window.innerWidth,


    y:
      Math.random() *
      window.innerHeight,


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


// ========================================
// ANIMACION DE PETALOS
// ========================================

function animate() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  for (
    const petal of petals
  ) {

    // Movimiento vertical

    petal.y +=
      petal.speed;


    // Movimiento lateral

    petal.x +=
      petal.drift;


    // Si sale de la pantalla

    if (
      petal.y >
      window.innerHeight + 10
    ) {

      petal.y = -10;


      petal.x =
        Math.random() *
        window.innerWidth;

    }


    // ====================================
    // DIBUJAR PETALO
    // ====================================

    ctx.beginPath();


    ctx.arc(

      petal.x,

      petal.y,

      petal.size,

      0,

      Math.PI * 2

    );


    ctx.fillStyle =
      "rgba(247, 193, 0, .65)";


    ctx.fill();

  }


  requestAnimationFrame(
    animate
  );

}


animate();