const User = require('../api/models/user.model')
const Game = require('../api/models/game.model')
const Theme = require('../api/models/theme.model')

function addRelationsToModels() {
	try {
			/*User.belongsTo(Country);
			Country.hasMany(User);


			User.hasOne(Address, { onDelete: 'cascade', onUpdate: 'cascade' });
			Address.belongsTo(User, { onDelete: 'cascade', onUpdate: 'cascade' });


			Actor.belongsToMany(Movie, {
				through: 'ActorMovie',
				as: 'ActorMovies',
				onDelete: 'cascade',
				onUpdate: 'cascade',
				timestamps: false
			});
			Movie.belongsToMany(Actor, {
				through: 'ActorMovie',
				as: 'ActorMovies',
				onDelete: 'cascade',
				onUpdate: 'cascade',
				timestamps: false
			});*/

			console.log('Relations added to all models');
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels