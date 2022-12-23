
function create_lines(squares) {
  const lines = []
  lines.push([squares[0], squares[1], squares[2]])
  lines.push([squares[3], squares[4], squares[5]])
  lines.push([squares[6], squares[7], squares[8]])
  lines.push([squares[0], squares[3], squares[6]])
  lines.push([squares[1], squares[4], squares[7]])
  lines.push([squares[2], squares[5], squares[8]])
  lines.push([squares[0], squares[4], squares[8]])
  lines.push([squares[2], squares[4], squares[6]])
  return lines;
}

export function calculateWinner(squares) {
  const lines = create_lines(squares);
  console.log(lines)
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if ((a ==='X' || a === 'O') && (a === b && a === c)) {
      console.log("winner!")
			return a;
		}
	}
	return null;
}
