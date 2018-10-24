import React from "react";
import Board from "./Board";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import { shallow, configure } from "enzyme";
configure({ adapter: new Adapter() });

describe("Page loads", () => {
	describe("After the page loads", () => {
		// Assert the board has 9 active fields
		it("Should render 9 active fields as tic tac toe tiles", () => {
			const wrapper = mount(<Board />);
			expect(wrapper.state().tiles.length).toEqual(9);
			wrapper.unmount();
		});

		// Assert the current player is X
		it("Should set the Current Player to 1", () => {
			const wrapper = mount(<Board />);
			expect(wrapper.state().currentPlayer).toEqual(1);
			wrapper.unmount();
		});
	});
});

describe("Player 1 makes a move", () => {
	// Assert that the current playerplaces an X in a spot on the board
	it("Should mark 1 in the board", () => {
		const wrapper = mount(<Board />);
		wrapper
			.find("Tile")
			.first()
			.simulate("click");
		expect(
			wrapper
				.find("Tile")
				.first()
				.props().player
		).toEqual(1);
		wrapper.unmount();
	});

	//Assert the current player is O
	it("Should set the Current Player to 2", () => {
		const wrapper = mount(<Board />);
		wrapper
			.find("Tile")
			.first()
			.simulate("click");
		expect(wrapper.state().currentPlayer).toEqual(2);
		wrapper.unmount();
	});
});

describe("Player 2 makes a move", () => {
	// Assert that the current player places an O in a spot on the board
	const wrapper = mount(<Board />);
	it("should mark 2 in the board", () => {
		wrapper
			.find("Tile")
			.at(0)
			.simulate("click");
		wrapper
			.find("Tile")
			.at(1)
			.simulate("click");
		expect(
			wrapper
				.find("Tile")
				.at(1)
				.props().player
		).toEqual(2);
	});
	it("Should not switch allow player 2's marker to be changed by player 1 or player 2", () => {
		// Assert that the placement isin anunoccupied spot.

		wrapper
			.find("Tile")
			.at(1)
			.simulate("click");

		expect(
			wrapper
				.find("Tile")
				.at(1)
				.props().player
		).toEqual(2);
		wrapper.unmount();
	});
});
