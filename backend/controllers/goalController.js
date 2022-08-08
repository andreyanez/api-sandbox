const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');

//@desc     Get goals
//@route    GET /api/goals
//@access   private
const getGoals = asyncHandler(async (req, res) => {
	const getGoals = await Goal.find();

	if (!getGoals) throw new Error('No bucket items');

	res.status(200).json(getGoals);
});

//@desc     add goal
//@route    POST /api/goals
//@access   private
const addGoal = asyncHandler(async (req, res) => {
	const newGoal = await Goal.create({
		text: req.body.text,
	});
	if (!newGoal) throw new Error('Something went wrong saving your data');
	res.status(200).json(newGoal);
});

//@desc     updates goal
//@route    PUT /api/goals/:id
//@access   private
const updateGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body);
	if (!updatedGoal) throw Error('Something went wrong updating the data');
	res.status(200).json(updatedGoal);
});

//@desc     deletes goal
//@route    DELETE /api/goals/:id
//@access   private
const deleteGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const removedGoal = await Goal.findByIdAndDelete(id);
	if (!removedGoal) throw Error('Something went wrong erasing the data');
	res.status(200).json(removedGoal);
});

module.exports = {
	getGoals,
	addGoal,
	updateGoal,
	deleteGoal,
};
