const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetEl = document.getElementById("reset");

let cells;
let turn;
let over;

function winner(marks) {
  for (const [a, b, c] of LINES) {
    if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
      return marks[a];
    }
  }
  return null;
}

function handleMove(i) {
  if (over || cells[i].textContent) return;
  cells[i].textContent = turn;
  const marks = cells.map((c) => c.textContent);
  const w = winner(marks);
  if (w) {
    statusEl.textContent = `${w} wins!`;
    over = true;
  } else if (marks.every(Boolean)) {
    statusEl.textContent = "Draw.";
    over = true;
  } else {
    turn = turn === "X" ? "O" : "X";
    statusEl.textContent = `${turn}'s turn`;
  }
}

function reset() {
  boardEl.innerHTML = "";
  cells = Array.from({ length: 9 }, (_, i) => {
    const btn = document.createElement("button");
    btn.className = "cell";
    btn.setAttribute("role", "gridcell");
    btn.addEventListener("click", () => handleMove(i));
    boardEl.appendChild(btn);
    return btn;
  });
  turn = "X";
  over = false;
  statusEl.textContent = "X's turn";
}

resetEl.addEventListener("click", reset);
reset();
