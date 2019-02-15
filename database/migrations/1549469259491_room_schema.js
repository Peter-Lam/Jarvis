'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoomsSchema extends Schema {
<<<<<<< HEAD
  up() {
    this.create('rooms', (table) => {
      table.string('name', 20).notNullable().unique()
      table.string('location', 100).notNullable()
      table.string('telephone', 20)
      table.integer('seats', 500).notNullable()
      table.integer('capacity', 500).notNullable()
      table.bool('projector')
      table.bool('whiteboard')
      table.bool('flipchart')
      table.bool('audioConference')
      table.bool('videoConference')
      table.string('extraEquipment', 100)
      table.string('comment', 100)
      table.string('floorplan', 100)
      table.string('picture', 100)
      table.string('calendar', 250)
      table.primary('name')
      table.timestamps()
    })
  }
=======
	up () {
		this.create('rooms', (table) => {
			table.string('name', 20).notNullable().unique();
			table.string('location', 100).notNullable();
			table.string('telephone', 20);
			table.integer('seats', 500).notNullable();
			table.integer('capacity', 500).notNullable();
			table.bool('projector');
			table.bool('whiteboard');
			table.bool('flipchart');
			table.bool('audioConference');
			table.bool('videoConference');
			table.string('extraEquipment', 100);
			table.string('comment', 100);
			table.string('floorplan', 100);
			table.string('picture', 100);
			table.primary('name');
			table.timestamps();
		});
	}
>>>>>>> dev

	down () {
		this.drop('rooms');
	}
}

module.exports = RoomsSchema;
