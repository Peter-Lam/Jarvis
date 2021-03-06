'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FloorsSchema extends Schema {
	up () {
		this.create('floors', (table) => {
			table.increments();
			table.string('name_english', 20).notNullable();
			table.string('name_french', 20).notNullable();
			table.integer('building_id', 4).notNullable();
			table.timestamps();
		});
	}

	down () {
		this.drop('floors');
	}
}

module.exports = FloorsSchema;
