# Minesweeper

This project is a Minesweeper game implemented in JavaScript. The game allows users to select different difficulties and use power-ups to assist in clearing the minefield.

## Requirements

- A modern web browser with JavaScript enabled

## Usage

1. Open the `index.html` file in your web browser.
2. Select a difficulty level (Easy, Medium, Hard) to start a new game.
3. Use the left mouse button to reveal cells.
4. Use the right mouse button to place flags on suspected mines.
5. Use power-ups to assist in clearing the minefield.

## How It Works

### Difficulty Levels

- **Easy**: 8x8 grid with 10 mines
- **Medium**: 13x15 grid with 40 mines
- **Hard**: 16x20 grid with 99 mines

### Power-Ups

- **Spotter**: Reveals if a selected cell is a mine or the number of adjacent mines.
- **Grid**: Reveals the number of mines in a 3x3 area around the selected cell.
- **Shield**: Protects the player from losing when clicking on a mine.

### Functions

- **`setEasy()`**: Sets the game to easy difficulty and initializes the minefield.
- **`setMed()`**: Sets the game to medium difficulty and initializes the minefield.
- **`setHard()`**: Sets the game to hard difficulty and initializes the minefield.
- **`spotterPowerup()`**: Activates or deactivates the Spotter power-up.
- **`gridPowerup()`**: Activates or deactivates the Grid power-up.
- **`shieldPowerup()`**: Activates or deactivates the Shield power-up.
- **`createBaseArr()`**: Creates the base minefield array.
- **`countMines()`**: Counts the number of mines adjacent to each cell.
- **`clearAllBlank(i, j)`**: Reveals all connected blank cells and adjacent numbers.
- **`change()`**: Main function that handles cell clicks and game logic.
- **`addMines(row, col, mineAmount, minepercent)`**: Adds mines to the minefield.
