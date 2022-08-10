const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');
const User = require('../model/userModel');

//@desc     Get goals
//@route    GET /api/goals
//@access   private
const getGoals = asyncHandler(async (req, res) => {
	const getGoals = await Goal.find({ user: req.user.id });

	if (!getGoals) throw new Error('No bucket items');

	res.status(200).json(getGoals);
});

//@desc     add goal
//@route    POST /api/goals
//@access   private
const addGoal = asyncHandler(async (req, res) => {
	const newGoal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	if (!newGoal) throw new Error('Something went wrong saving your data');
	res.status(200).json(newGoal);
});

//@desc     updates goal
//@route    PUT /api/goals/:id
//@access   private
const updateGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const goal = await Goal.findById(id);

	// checks for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// makes sure the logged in user mathes the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body);
	if (!updatedGoal) {
		res.status(400);
		throw Error('Something went wrong updating the data');
	}
	res.status(200).json(updatedGoal);
});

//@desc     deletes goal
//@route    DELETE /api/goals/:id
//@access   private
const deleteGoal = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const goal = await Goal.findById(id);

	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// makes sure the logged in user mathes the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const removedGoal = await goal.remove(id);
	if (!removedGoal) throw Error('Something went wrong erasing the data');
	res.status(200).json(removedGoal);
});

module.exports = {
	getGoals,
	addGoal,
	updateGoal,
	deleteGoal,
};
