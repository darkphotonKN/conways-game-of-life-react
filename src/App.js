import React, { Component } from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import Buttons from './components/Buttons';

/* CONWAY'S GAME OF LIFE

Attempting to implement Conway's Game of Life 

Wikipedia's description of the rules: 

'The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in 
one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its 
eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, 
the following transitions occur:

Any live cell with fewer than two live neighbors dies, as if by under population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overpopulation.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules 
simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this 
happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be 
applied repeatedly to create further generations.'

*/

class App extends Component {

  constructor() {
    super();
    this.speed = 1000;
    this.rows = 40;
    this.cols = 50;

    // state 
    this.state = {
      generation: 0, // tracking generations elapsed
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  componentDidMount() {
    this.seed(); // automatically seed the grid to a random default state once component is mounted
    this.play();// starts the Game of Life
  }

    // check neighbours of a current grid position to check if it should become alive or die out
  checkNeighbours = (row, col, grid) => {
    let liveNeighbours = 0; // store number of live neighbours

    // check if neighbours are alive or dead, adding to the number of live neighbours of the current grid cell
    if(grid[row+1] !== undefined) if(grid[row+1][col] === true) liveNeighbours+=1;
    if(grid[col-1] !== undefined) if(grid[row][col-1] === true) liveNeighbours+=1;
    if(grid[col+1] !== undefined) if(grid[row][col+1] === true) liveNeighbours+=1;
    if(grid[row-1] !== undefined) if(grid[row-1][col] === true) liveNeighbours+=1;
    if(grid[row+1] !== undefined && [col+1] !== undefined) if(grid[row+1][col+1] === true) liveNeighbours+=1;
    if(grid[row+1] !== undefined && [col-1] !== undefined) if(grid[row+1][col-1] === true) liveNeighbours+=1;
    if(grid[row-1] !== undefined && [col+1] !== undefined) if(grid[row-1][col+1] === true) liveNeighbours+=1;
    if(grid[row-1] !== undefined && [col-1] !== undefined) if(grid[row-1][col-1] === true) liveNeighbours+=1;

    // based on the number of live neighbours decide and return the "fate" of this grid cell
    if(liveNeighbours<2) return false;
    // only alive if already alive in previous generation
    if(grid[row][col] === true) if(liveNeighbours===2 || liveNeighbours===3) return true; 
    if(liveNeighbours===3) return true;
    if(liveNeighbours>3) return false; 
  }

  // advances one generation 
  nextGeneration = () => {
    const newGenGrid = [ ...this.state.grid ];

    // check neighbours
    const rows = this.rows;
    const cols = this.cols;

    for(let row=0; row<rows; row++) {
        for(let col=0; col<cols; col++) {
            newGenGrid[row][col] = this.checkNeighbours(row, col, newGenGrid);
        }
    }
      
    // updates the grid    
    this.setState({ grid: newGenGrid, generation: this.state.generation+1 }); 
  }

  play = () => {
    clearInterval(this.intervalId);
    this.seed();
    this.intervalId = setInterval(this.nextGeneration, 1000); 

  }

  // makes selected box true and hence 'on'
  selectBox = (row, col) => {
    const gridCopy = [...this.state.grid]; // copy array
    gridCopy[row][col] = !gridCopy[row][col]; // set opposite of what the previous boolean value at the index was

    this.setState({ grid: gridCopy });
  }

  // seeding the board with a random starting state of 'alive' boxes
  seed = () => {
    const gridCopy = [...this.state.grid];
    
    // loop through entire grid 
    for(let i=0; i<this.rows; i++) {
      for(let j=0; j<this.cols; j++) {
        // ~x% chance to seed a spot on the board
        gridCopy[i][j] = Math.floor(Math.random()*8)===0 ? true : false;     
      }
    }

    this.setState({ grid: gridCopy });
  }

  clearGrid = () => {
    let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    let generation = 0;
    clearInterval(this.intervalId);
    this.setState({ grid, generation });
  }

  render() {
    // object destructuring
    const { generation, grid } = this.state;

    return (
      <div className="App">

        <header className="App-header">
          
          <h1 className="App-title">Game of Life</h1>

          <Buttons 
            onPlay={this.play}
            onClearGrid={this.clearGrid}
          />



        </header>
        
        <MainGrid
            generation={generation}
            grid={grid}
            selectBox={this.selectBox}
            speed={this.speed}
            cols={this.cols}
            rows={this.rows}
            seed={this.seed}
          />
      </div>
    );
  }
}

export default App;
