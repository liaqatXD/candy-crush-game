document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squares = [];
  const candyColors = [
    "blue-candy",
    "green-candy",
    "orange-candy",
    "purple-candy",
    "red-candy",
    "red-candy",
    "yellow-candy",
  ];
  const audio = document.querySelector("audio");
  let score = 0;
  const scoreText = document.querySelector("span");
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.append(square);
    squares.push(square);
  }
  includeCandies();

  //adding candies and making squares draggable and assigning them id & color
  function includeCandies() {
    squares.forEach((square, index) => {
      const candyColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      const candyImg = document.createElement("img");
      candyImg.src = "images/" + candyColor + ".png";
      square.append(candyImg);
      square.setAttribute("draggable", "true");
      square.setAttribute("square-id", index);
      square.setAttribute("candy-color", candyColor);
    });
  }

  //Event handling
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;
  squares.forEach((square) => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("dragenter", dragEnter);
    square.addEventListener("drop", dragDrop);
  });

  function dragStart() {
    colorBeingDragged = this;
    squareIdBeingDragged = Number(this.getAttribute("square-id"));
    colorBeingDragged = this.getAttribute("candy-color");
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function dragEnter(event) {
    event.preventDefault();
  }

  



  function dragDrop() {
    squareIdBeingReplaced = Number(this.getAttribute("square-id"));
    const validMoves = [
      squareIdBeingDragged + 1,
      squareIdBeingDragged - 1,
      squareIdBeingDragged + width,
      squareIdBeingDragged - width,
    ];
    if (validMoves.includes(squareIdBeingReplaced)) {
      colorBeingReplaced = this.getAttribute("candy-color");

      const draggedSquare = squares[squareIdBeingDragged];
      const replacedSquare = squares[squareIdBeingReplaced];
      const draggedImage = draggedSquare.firstChild;
      const replacedImage = replacedSquare.firstChild;
      const placeHolderImg = draggedImage.src;
      const placeHolderColor = colorBeingDragged;
      draggedSquare.setAttribute("candy-color", colorBeingReplaced);
      replacedSquare.setAttribute("candy-color", placeHolderColor);

      draggedImage.src = replacedImage.src;
      replacedImage.src = placeHolderImg;
    }
  }

  //Checking matches for rows of 3
  function checkRowForThree() {
    for (let i = 0; i <= 61; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = squares[i].getAttribute("candy-color");
      const isBlank = squares[i].getAttribute("candy-color") == "blank";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

      if (!notValid.includes(i)) {
        if (
          !isBlank &&
          rowOfThree.every(
            (square) =>
              squares[square].getAttribute("candy-color") === decidedColor
          )
        ) {
          rowOfThree.forEach((square) => {
            squares[square].firstChild.src = "";
            squares[square].setAttribute("candy-color", "blank");
          });
          score += 3;
          scoreText.innerText = `${score}`;
        }
      }
    }
  }

  //Checking match for column of 3
  function checkColumnForThree() {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = squares[i].getAttribute("candy-color");
      const isBlank = squares[i].getAttribute("candy-color") == "blank";
      if (
        !isBlank &&
        columnOfThree.every(
          (square) =>
            squares[square].getAttribute("candy-color") === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => {
          squares[square].firstChild.src = "";
          squares[square].setAttribute("candy-color", "blank");
        });
        score += 3;
        scoreText.innerText = `${score}`;
      }
    }
  }

  //***** */
  //Checking matches for rows of 4
  function checkRowForFour() {
    for (let i = 0; i <= 60; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = squares[i].getAttribute("candy-color");
      const isBlank = squares[i].getAttribute("candy-color") == "blank";
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];

      if (!notValid.includes(i)) {
        if (
          !isBlank &&
          rowOfFour.every(
            (square) =>
              squares[square].getAttribute("candy-color") === decidedColor
          )
        ) {
          rowOfFour.forEach((square) => {
            squares[square].firstChild.src = "";
            squares[square].setAttribute("candy-color", "blank");
          });
          score += 4;
          scoreText.innerText = `${score}`;
        }
      }
    }
  }

  //Checking match for column of 4
  function checkColumnForFour() {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = squares[i].getAttribute("candy-color");
      const isBlank = squares[i].getAttribute("candy-color") == "blank";
      if (
        !isBlank &&
        columnOfFour.every(
          (square) =>
            squares[square].getAttribute("candy-color") === decidedColor
        )
      ) {
        columnOfFour.forEach((square) => {
          squares[square].firstChild.src = "";
          squares[square].setAttribute("candy-color", "blank");
        });
        score += 4;
        scoreText.innerText = `${score}`;
      }
    }
  }

  //Moving Candies Down
  function moveCandiesDown() {
    for (let i = 0; i <= 55; i++) {
      const belowSquare = squares[i + width];
      if (belowSquare.getAttribute("candy-color") == "blank") {
        const aboveSquare = squares[i];
        belowSquare.setAttribute(
          "candy-color",
          aboveSquare.getAttribute("candy-color")
        );
        belowSquare.firstChild.src = aboveSquare.firstChild.src;
        aboveSquare.setAttribute("candy-color", "blank");
        aboveSquare.firstChild.src = "";
      }
    }
  }

  //Making Candies[in 1st row]
  function makeCandies() {
    for (let i = 0; i <= 7; i++) {
      const square = squares[i];
      if (square.getAttribute("candy-color") == "blank") {
        const candyColor =
          candyColors[Math.floor(Math.random() * candyColors.length)];
        const candyImg = "images/" + candyColor + ".png";
        square.setAttribute("candy-color", candyColor);
        square.firstChild.src = candyImg;
      }
    }
  }

  window.setInterval(matchCheck, 100);

  function matchCheck() {
    makeCandies();
    moveCandiesDown();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }
});

function playAudio() {
  const audio = document.querySelector("audio");
  if (audio !== null) {
    audio.play();
  }
}
