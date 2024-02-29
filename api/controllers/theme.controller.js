const Theme = require('../models/theme.model')
const { Op } = require('sequelize');

async function getAllThemes(req, res) {
	
	try {
		const themes = await Theme.findAll()
		if (themes) {
			return res.status(200).json(themes)
		} else {
			return res.status(404).send('No themes found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneTheme(req, res) {
	try {
		const theme = await Theme.findByPk(req.params.id)
		if (theme) {
			return res.status(200).json(theme)
		} else {
			return res.status(404).send('Theme not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createTheme(req, res) {
	try {
		const theme = await Theme.create(req.body)
		return res.status(200).json({ message: 'Theme created', theme: theme })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateTheme(req, res) {
	try {
		const [themeExist, theme] = await Theme.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (themeExist !== 0) {
			return res.status(200).json({ message: 'Theme updated', theme: theme })
		} else {
			return res.status(404).send('Theme not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteTheme(req, res) {
	try {
		const theme = await Theme.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (theme) {
			return res.status(200).json('Theme deleted')
		} else {
			return res.status(404).send('Theme not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getThemes(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const themes = await User.findAll(
			{
				where: whereClause
			})
		
		if (themes.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(themes)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllThemes,
	getOneTheme,
	createTheme,
	updateTheme,
	deleteTheme,
	getThemes
}
