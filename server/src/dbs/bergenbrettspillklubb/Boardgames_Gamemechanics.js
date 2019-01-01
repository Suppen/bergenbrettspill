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
	const Boardgames_Gamemechanics = sequelize.define(
		"Boardgames_Gamemechanics",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			boardgameBggId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Boardgames",
					key: "bggId"
				},
				unique: "boardgameGamemechanic"
			},
			gamemechanicId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Gamemechanics",
					key: "id"
				},
				unique: "boardgameGamemechanic"
			}
		},
		{
			timestamps: false
		}
	);

	// Define its associations
	Boardgames_Gamemechanics.associate = () => {};

	return Boardgames_Gamemechanics;
};
