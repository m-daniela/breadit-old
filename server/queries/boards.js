
const Board = require("../model/Board");

/**
 * get all available boards
 * @returns query result
 */
const getBoards = async () => {
    return await Board.find({}, {posts: 0, __v: 0});
}

/**
 * add a board
 * @param {*} id 
 * @param {*} name 
 * @param {*} description 
 * @returns the added board or error
 */
const addBoard = async (id, name, description) => {
    const board = new Board({
        _id: id, 
        name, 
        description
    });
    return await board.save();
}

module.exports = {
    getBoards, 
    addBoard
};