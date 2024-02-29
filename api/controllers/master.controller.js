const Master = require('../models/master.model')
const { Op } = require('sequelize');

async function getAllMasters(req, res) {
	
	try {
		const masters = await Master.findAll()
		if (masters) {
			return res.status(200).json(masters)
		} else {
			return res.status(404).send('No Masters found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneMaster(req, res) {
	try {
		const master = await Master.findByPk(req.params.id)
		if (master) {
			return res.status(200).json(master)
		} else {
			return res.status(404).send('Master not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createMaster(req, res) {
	try {
		const master = await Master.create(req.body)
		return res.status(200).json({ message: 'Master created', master: master })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateMaster(req, res) {
	try {
		const [masterExist, master] = await Master.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (masterExist !== 0) {
			return res.status(200).json({ message: 'Master updated', master: master })
		} else {
			return res.status(404).send('Master not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteMaster(req, res) {
	try {
		const master = await Master.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (master) {
			return res.status(200).json('Master deleted')
		} else {
			return res.status(404).send('Master not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getMasters(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const masters = await Master.findAll(
			{
				where: whereClause
			})
		
		if (masters.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(masters)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllMasters,
	getOneMaster,
	createMaster,
	updateMaster,
	deleteMaster,
	getMasters
}
