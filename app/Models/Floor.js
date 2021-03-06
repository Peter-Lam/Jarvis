'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Floor extends Model {
	static get table () {
		return 'floors';
	}

	building () {
		return this.belongsTo('App/Models/Building', 'building_id');
	}

	room () {
		return this.hasMany('App/Models/Room', 'id', 'floor_id');
	}
}

module.exports = Floor;
