'use strict';

const Task = use('Task');
const Env = use('Env');
const Token = use('App/Models/Token');
const credentials = {
	client: {
		id: Env.get('MICROSOFT_APP_ID'),
		secret: Env.get('MICROSOFT_APP_PASSWORD')
	},

	auth: {
		tokenHost: Env.get('MICROSOFT_HOST'),
		authorizePath: Env.get('MICROSOFT_AUTHORIZE_ENDPOINT'),
		tokenPath: Env.get('MICROSOFT_TOKEN_ENDPOINT')
	}
};
const Oauth2 = require('simple-oauth2').create(credentials);

async function saveToDatabase (token) {
	await Token.truncate();
	const accessTokenModel = new Token();
	accessTokenModel.token = token.token.access_token;
	accessTokenModel.type = 'access';
	accessTokenModel.save();
	const refreshTokenModel = new Token();
	refreshTokenModel.token = token.token.refresh_token;
	refreshTokenModel.type = 'refresh';
	refreshTokenModel.save();
}

class RefreshAccessToken extends Task {
	static get schedule () {
		return '*/30 * * * *';
	}

	async handle () {
		const results = await Token.findBy('type', 'refresh');
		const refreshToken = results.toJSON().token;

		if (refreshToken) {
			const newToken = await Oauth2.accessToken.create({
				refresh_token: refreshToken
			}).refresh();

			saveToDatabase(newToken);
		}
	}
}

module.exports = RefreshAccessToken;
