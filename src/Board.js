import React, { Component} from "react";

function Square(props) {
  return (
    <button style={props.winner !== false ? {color: 'red'} : {color: 'black'}} className="square" data-col={props.col} data-row={props.row} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, row, col) {
  	
  	return (
  		<Square
  			value={this.props.squares[i]}
  			winner={this.props.winner.indexOf(i) > -1}
        	onClick={() => this.props.onClick(i, row, col)}
  		/>
  	);
  }

  renderBoard() {
  	let counter = 0;
  	let boardItem = [];
  	for (let i = 0; i < 3; i++) {
  		let squaresItems = [];
  		for (let j = 0; j < 3; j++) {
  			squaresItems.push(this.renderSquare(counter, i, j));
  			counter++;
  		}

  		boardItem.push(<div className="board-row">{squaresItems}</div>);
  	}

  	return boardItem;
  }

  render() {
  	return (
  	   <div>
  	     {this.renderBoard()}
  	   </div>
	);
  }
}

export default Board;