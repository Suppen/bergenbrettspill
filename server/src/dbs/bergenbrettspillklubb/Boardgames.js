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
	const Boardgames = sequelize.define(
		"Boardgames",
		{
			bggId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			bggUrl: {
				type: DataTypes.STRING,
				allowNull: false
			},
			thumbnailUrl: DataTypes.STRING,
			imageUrl: DataTypes.STRING,
			title: DataTypes.STRING,
			minPlayers: DataTypes.TINYINT,
			maxPlayers: DataTypes.TINYINT,
			playingTime: DataTypes.SMALLINT,
			expands: {
				type: DataTypes.INTEGER,
				references: {
					model: "Boardgames",
					key: "bggId"
				}
			}
		},
		{
			timestamps: false
		}
	);

	// Define its associations
	Boardgames.associate = models => {
		models.Boardgames.belongsToMany(models.Gamemechanics, {
			through: "Boardgames_Gamemechanics",
			as: "mechanics",
			foreignKey: "boardgameBggId",
			otherKey: "gamemechanicId",
			timestamps: false
		});

		models.Boardgames.addScope("withMechanics", {
			include: [
				{
					model: models.Gamemechanics,
					as: "mechanics",
					attributes: ["id", "name"],
					through: {
						attributes: []
					},
					order: [["name", "ASC"]]
				}
			]
		});
	};

	return Boardgames;
};
