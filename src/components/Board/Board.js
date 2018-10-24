import React, { Component, Fragment } from "react";
import "./Board.css";
const Tile = ({ number, player, handleTileClick }) => {
	return (
		<div
			className="tile"
			onClick={() => handleTileClick(number)}
		>
			<div className="player"> {player}</div>
		</div>
	);
};

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPlayer: 1,
			tiles: null,
			winner: null
		};
		this.CreateBoard = this.CreateBoard.bind(this);
		this.CurrentPlayer = this.CurrentPlayer.bind(this);
		this.handleTileClick = this.handleTileClick.bind(this);
	}
	CreateBoard() {
		let tiles = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
		tiles.forEach(function(tile) {
			tile.number = tiles.indexOf(tile);
			tile.player = null;
		});
		this.setState({ tiles });
	}

	handleTileClick(number) {
		
		let { tiles, currentPlayer, winner } = this.state;

		// i would have written this above in the tile as a ternary operator to call null instead of this entire function but requirements had it here instead
		function SpaceInUse() {
			if(tiles[number].player == null) {
				return false
			} else {
				return true;
			}
		}
		if(!SpaceInUse()) {
			if (!winner) {
			// sets clicked tile's player value
			for (let tile in tiles) {
				if (tiles[tile].number == number) {
					tiles[tile].player = currentPlayer;
					break;
				}
			}

			// checks if there's a winner now
			this.setState({ tiles }, this.checkIfWinner);
		}
		}
		
	}

	checkIfWinner() {
		const { tiles, currentPlayer } = this.state;

		// helper function
		function tileVal(tileIndex) {
			if (tiles[tileIndex].player == currentPlayer) {
				return 1;
			} else {
				return 0;
			}
		}
		const currPlayerComboRepresentation = [
			[tileVal(0), tileVal(1), tileVal(2)],
			[tileVal(3), tileVal(4), tileVal(5)],
			[tileVal(6), tileVal(7), tileVal(8)]
		];

		let winningCombos = [
			[[1, 1, 1], [0, 0, 0], [0, 0, 0]],
			[[0, 0, 0], [1, 1, 1], [0, 0, 0]],
			[[0, 0, 0], [0, 0, 0], [1, 1, 1]],
			[[1, 0, 0], [1, 0, 0], [1, 0, 0]],
			[[0, 1, 0], [0, 1, 0], [0, 1, 0]],
			[[0, 0, 1], [0, 0, 1], [0, 0, 1]],
			[[1, 0, 0], [0, 1, 0], [0, 0, 0]],
			[[0, 0, 1], [0, 1, 0], [1, 0, 0]]
		];

		let winner = false;
		for (let combo in winningCombos) {
			let valCount = 0;
			for (let row in winningCombos[combo]) {
				for (let val in winningCombos[combo][row]) {
					if (
						winningCombos[combo][row][val] ==
						currPlayerComboRepresentation[row][val]
					) {
						valCount++;
					}
				}
			}
			if (valCount == 9) {
				winner = true;
				break;
			}
		}
		if (winner) {
			this.setState({ winner: currentPlayer });
		} else {
			this.ChangePlayer();
		}

		// using DOM vals, crete a representation via objects or collections of the board
		// then, using loops, determine if there's a winner!
	}

	ChangePlayer() {
		let { currentPlayer } = this.state;
		if (currentPlayer == 1) {
			currentPlayer = 2;
		} else {
			currentPlayer = 1;
		}
		this.setState({ currentPlayer });
	}

	CurrentPlayer() {
		return this.state.currentPlayer;
	}

	componentDidMount() {
		this.CreateBoard();
	}
	render() {
		const { tiles, currentPlayer, winner } = this.state;
		return (
			<Fragment>
				<div id="board">
					{tiles != null &&
						tiles.map(
							function(tile) {
								return (
									<Tile
										number={tile.number}
										player={tile.player}
										key={tile.number}
										handleTileClick={this.handleTileClick}
									/>
								);
							}.bind(this)
						)}
				</div>
				<div className="player-indicator">
					{winner != null && <h3>Winner: {winner}</h3>}
					{winner == null && <h3>Player: {currentPlayer} </h3>}
				</div>
			</Fragment>
		);
	}
}

export default Board;
