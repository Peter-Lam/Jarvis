'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class RoomFeature extends Model {
	static get table () {
		return 'room_features';
	}

	category () {
		return this.belongsTo('App/Models/RoomFeaturesCategory', 'feature_category_id');
	}

	building () {
		return this.belongsTo('App/Models/Building', 'building_id');
	}
}

module.exports = RoomFeature;
