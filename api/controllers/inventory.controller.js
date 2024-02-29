const Inventory = require('../models/inventory.model')
const { Op } = require('sequelize');

async function getAllItems(req, res) {
	
	try {
		const items = await Inventory.findAll()
		if (items) {
			return res.status(200).json(items)
		} else {
			return res.status(404).send('No items found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneItem(req, res) {
	try {
		const item = await Inventory.findByPk(req.params.id)
		if (item) {
			return res.status(200).json(item)
		} else {
			return res.status(404).send('Item not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createItem(req, res) {
	try {
		const item = await Inventory.create(req.body)
		return res.status(200).json({ message: 'Item created', item: item })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateItem(req, res) {
	try {
		const [itemExist, item] = await Inventory.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (itemExist !== 0) {
			return res.status(200).json({ message: 'Item updated', item: item })
		} else {
			return res.status(404).send('Item not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteItem(req, res) {
	try {
		const item = await Inventory.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (item) {
			return res.status(200).json('Item deleted')
		} else {
			return res.status(404).send('Item not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getItems(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const items = await Inventory.findAll(
			{
				where: whereClause
			})
		
		if (items.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(items)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllItems,
	getOneItem,
	createItem,
	updateItem,
	deleteItem,
	getItems
}
