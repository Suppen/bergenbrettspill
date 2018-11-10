"use strict";

/**************************
 * Import important stuff *
 **************************/

// Nothing

/****************************
 * Make the setup functions *
 ****************************/

module.exports = (sequelize, DataTypes) => {
	// Define the model itself
	const Gamemechanics = sequelize.define(
		"Gamemechanics",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				unique: true
			}
		},
		{
			timestamps: false
		}
	);

	// Define its associations
	Gamemechanics.associate = models => {
		models.Gamemechanics.belongsToMany(models.Boardgames, {
			through: "Boardgames_Gamemechanics",
			foreignKey: "gamemechanicId",
			otherKey: "boardgameBggId",
			timestamps: false
		});
	};

	return Gamemechanics;
};
