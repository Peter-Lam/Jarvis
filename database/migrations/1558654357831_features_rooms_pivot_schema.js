'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FeaturesRoomsPivotSchema extends Schema {
	up () {
		this.create('features_rooms_pivot', (table) => {
			table.increments();
			table.integer('room_id').unsigned().references('id').inTable('rooms').notNullable();
			table.integer('room_feature_id').unsigned().references('id').inTable('room_features').notNullable();
			table.timestamps();
		});
	}

	down () {
		this.drop('features_rooms_pivot');
	}
}

module.exports = FeaturesRoomsPivotSchema;
