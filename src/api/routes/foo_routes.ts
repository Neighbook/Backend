import express from 'express';
const route = express.Router();

// FooController
route.get('/foo', (req, res) => {
	// #swagger.tags = ['Users']
		res.json({ id: 1, name: "Catcher in the Rye" })
});

module.exports = route;
