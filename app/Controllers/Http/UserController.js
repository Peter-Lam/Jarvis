'use strict';

const User = use('App/Models/User');
const AccountRequest = use('App/Models/AccountRequest');
const Mail = use('Mail');
const Hash = use('Hash');
const Env = use('Env');

<<<<<<< HEAD
function random(times) {

  let result = '';

  for (let i = 0; i < times; i++) {
    result += Math.random().toString(36).substring(2);
  }

  return result;
=======
function random (times) {
	let result = '';
	for (let i = 0; i < times; i++) {
		result += Math.random().toString(36).substring(2);
	}

	return result;
>>>>>>> e33c336a6aa57c351c356b0a32dc55f16c4a6011
};

/**
 *
 * @param {string} subject  Subject of Email
 * @param {string} body     Body of Email
 * @param {string} to       Sending address
 * @param {string} from     Receiving address
 */
function sendMail (subject, body, to, from) {
	Mail.raw(body, (message) => {
		message
			.to(to)
			.from(from)
			.subject(subject);
	});
	console.log('mail sent');
};

class UserController {
<<<<<<< HEAD
  async create({ request, response, auth }) {
    const confirmationRequired = Env.get('REGISTRATION_CONFIRMATION', false);

    if (confirmationRequired) {
      return this.createWithVerifyingEmail({ request, response });
    } else {
      return this.createWithoutVerifyingEmail({ request, response, auth });
    }
  }

  async createWithoutVerifyingEmail({ request, response, auth }) {
    var userInfo = request.only(['firstname', 'lastname', 'email', 'password', 'tower', 'floor']);
    userInfo.role = 2;
    userInfo.verified = true;
    const user = await User.create(userInfo);

    await auth.login(user);
    return response.redirect('/');
  }

  async createWithVerifyingEmail({ request, response, auth }) {
    var userInfo = request.only(['firstname', 'lastname', 'email', 'password', 'tower', 'floor']);
    userInfo.role = 2;
    userInfo.verified = false;

    let hash = random(4);

    let row = {
      email: userInfo.email,
      hash: hash,
      type: 2
    };
    await AccountRequest.create(row);

    let body = `
=======
	async create ({ request, response, auth }) {
		const confirmationRequired = Env.get('REGISTRATION_CONFIRMATION', false);

		if (confirmationRequired) {
			return this.createWithVerifyingEmail({ request, response });
		} else {
			return this.createWithoutVerifyingEmail({ request, response, auth });
		}
	}

	async createWithoutVerifyingEmail ({ request, response, auth }) {
		var userInfo = request.only(['firstname', 'lastname', 'email', 'password', 'tower', 'floor']);
		userInfo.role = 2;
		userInfo.verified = true;
		const user = await User.create(userInfo);

		await auth.login(user);
		return response.redirect('/');
	}

	async createWithVerifyingEmail ({ request, response, auth }) {
		var userInfo = request.only(['firstname', 'lastname', ' email', 'password', 'tower', 'floor']);
		userInfo.role = 2;
		userInfo.verified = false;

		let hash = random(4);

		let row = { email: userInfo.email,
			hash: hash,
			type: 2 };
		await AccountRequest.create(row);

		let body = `
>>>>>>> e33c336a6aa57c351c356b0a32dc55f16c4a6011
    <h2> Welcome to Jarvis </h2>
    <p>
      Please click the following URL into your browser: 
      http://localhost:3333/newUser?hash=${hash}
    </p>
<<<<<<< HEAD
    `

    await sendMail('Verify Email Address for Jarvis',
      body, userInfo.email, 'support@mail.cdhstudio.ca');

    await User.create(userInfo);
    return response.redirect('/login');
  }

  async verifyEmail({ request, response }) {
    const hash = request._all.hash

    try {
      let results = await AccountRequest
        .query()
        .where('hash', '=', hash)
        .fetch();
      let rows = results.toJSON();
      console.log(rows)
      const email = rows[0].email;

      await User
        .query()
        .where('email', email)
        .update({ verified: true });

      return response.redirect('/');
    } catch (err) {
      console.log(err)
    }
  }

  async createAdmin({ request, response, auth }) {
    var adminInfo = request.only(['firstname', 'lastname', 'email', 'password']);
    adminInfo['role'] = 1;
    adminInfo['verified'] = 1;
    const user = await User.create(adminInfo);

    await auth.login(user);
    return response.redirect('/');
  }

  async login({ request, auth, response, session }) {
    const { email, password } = request.all();

    const user = await User
      .query()
      .where('email', email)
      .where('verified', true)
      .first();

    try {
      await auth.attempt(user.email, password);
      return response.redirect('/');
    } catch (error) {
      session.flash({ loginError: 'These credentials do not work.' })
      return response.redirect('/login');
    }
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect('/');
  }

  async show({ auth, params, view }) {
    const user = await User.find(Number(params.id));
    var canEdit = 0;
    //if user is admin
    if (auth.user.role == 1) {
      var layoutType = 'layouts/adminLayout';
      canEdit = 1;
      //check if user is viewing their own profile
    } else if (auth.user.id == Number(params.id) && auth.user.role == 2) {
      var layoutType = 'layouts/mainLayout';
      canEdit = 1;
      //check if user is viewing someone elses profile
    } else if (auth.user.id != Number(params.id) && auth.user.role == 2) {
      var layoutType = 'layouts/mainLayout';
      canEdit = 0;
    } else {
      return response.redirect('/');
    }

    return view.render('auth.showUser', { auth, user, layoutType, canEdit });
  }

  async createPasswordResetRequest({ request, response }) {
    const email = request.body.email
    const results = await User
      .query()
      .where('email', '=', email)
      .fetch();
    const rows = results.toJSON();

    if (rows.length != 0) {
      let hash = random(4);

      let row = {
        email: email,
        hash: hash,
        type: 1
      };
      console.log(row);
      await AccountRequest.create(row);

      let body = `
=======
    `;

		await sendMail('Verify Email Address for Jarvis',
			body, userInfo.email, 'support@mail.cdhstudio.ca');

		await User.create(userInfo);
		return response.redirect('/login');
	}

	async verifyEmail ({ request, response }) {
		const hash = request._all.hash;

		try {
			let results = await AccountRequest
				.query()
				.where('hash', '=', hash)
				.fetch();
			let rows = results.toJSON();
			console.log(rows);
			const email = rows[0].email;

			await User
				.query()
				.where('email', email)
				.update({ verified: true });

			return response.redirect('/');
		} catch (err) {
			console.log(err);
		}
	}

	async createAdmin ({ request, response, auth }) {
		var adminInfo = request.only(['firstname', 'lastname', 'email', 'password']);
		adminInfo['role'] = 1;
		adminInfo['verified'] = 1;
		const user = await User.create(adminInfo);

		await auth.login(user);
		return response.redirect('/');
	}

	async login ({ request, auth, response, session }) {
		const { email, password } = request.all();

		const user = await User
			.query()
			.where('email', email)
			.where('verified', true)
			.first();

		try {
			await auth.attempt(user.email, password);
			return response.redirect('/');
		} catch (error) {
			session.flash({ loginError: 'These credentials do not work.' });
			return response.redirect('/login');
		}
	}

	async logout ({ auth, response }) {
		await auth.logout();
		return response.redirect('/');
	}

	async show ({ auth, params, view, response }) {
		const user = await User.find(Number(params.id));
		var canEdit = 0;
		var layoutType = '';
		// if user is admin
		if (auth.user.role === 1) {
			layoutType = 'layouts/adminLayout';
			canEdit = 1;
			// check if user is viewing their own profile
		} else if (auth.user.id === Number(params.id) && auth.user.role === 2) {
			layoutType = 'layouts/mainLayout';
			canEdit = 1;
			// check if user is viewing someone elses profile
		} else if (auth.user.id !== Number(params.id) && auth.user.role === 2) {
			layoutType = 'layouts/mainLayout';
			canEdit = 0;
		} else {
			return response.redirect('/');
		}

		return view.render('auth.showUser', { auth, user, layoutType, canEdit });
	}

	async createPasswordResetRequest ({ request, response }) {
		const email = request.body.email;
		const results = await User
			.query()
			.where('email', '=', email)
			.fetch();
		const rows = results.toJSON();

		if (rows.length !== 0) {
			let hash = random(4);

			let row = { email: email,
				hash: hash,
				type: 1 };
			console.log(row);
			await AccountRequest.create(row);

			let body = `
>>>>>>> e33c336a6aa57c351c356b0a32dc55f16c4a6011
      <h2> Password Reset Request </h2>
      <p>
        We received a request to reset your password. If you asked to reset your password, please click the following URL: 
        http://localhost:3333/newPassword?hash=${hash}
      </p>
<<<<<<< HEAD
      `
      await sendMail('Password Reset Request',
        body, email, 'support@mail.cdhstudio.ca');
    }

    return response.redirect('/login');
  }

  async verifyHash({ request, view }) {
    const hash = request._all.hash
    if (hash) {
      const results = await AccountRequest
        .query()
        .where('hash', '=', hash)
        .fetch();
      const rows = results.toJSON();
      console.log(hash)

      if (rows.length !== 0 && rows[0].type === 1) {
        const email = rows[0].email;

        return view.render('resetPassword', { email: email });
      }
    }
  }

  async resetPassword({ request, response }) {
    const newPassword = await Hash.make(request.body.password);
    const changedRow = await User
      .query()
      .where('email', request.body.email)
      .update({ password: newPassword });

    console.log(changedRow);
    return response.redirect('/login');
  }

  async changePassword({ request, response, auth, params, session }) {
    if (auth.user.role == 1 || (auth.user.id == Number(params.id) && auth.user.role == 2)) {



      try {
        const passwords = request.only(['newPassword']);
        const user = auth.user;
        const newPassword = await Hash.make(passwords.newPassword);

        const changedRow = await User
          .query()
          .where('id', Number(params.id))
          .update({ password: newPassword });
        session.flash({ success: 'Password Updated Successfully' })

      } catch (error) {
        session.flash({ error: 'Password Update failed' })
        return response.redirect('/login');
      }

      return response.route('viewProfile', { id: Number(params.id) });
      //check if user is viewing their own profile

    } else {
      return response.redirect('/');
    }





    if (isSame) {
      const newPassword = await Hash.make(passwords.newPassword);
      const changedRow = await User
        .query()
        .where('email', user.email)
        .update({ password: newPassword });
      console.log(changedRow);

      return response.redirect('/');
    }
  }
=======
      `;
			await sendMail('Password Reset Request',
				body, email, 'support@mail.cdhstudio.ca');
		}

		return response.redirect('/login');
	}

	async verifyHash ({ request, view }) {
		const hash = request._all.hash;
		if (hash) {
			const results = await AccountRequest
				.query()
				.where('hash', '=', hash)
				.fetch();
			const rows = results.toJSON();
			console.log(hash);

			if (rows.length !== 0 && rows[0].type === 1) {
				const email = rows[0].email;

				return view.render('resetPassword', { email: email });
			}
		}
	}

	async resetPassword ({ request, response }) {
		const newPassword = await Hash.make(request.body.password);
		const changedRow = await User
			.query()
			.where('email', request.body.email)
			.update({ password: newPassword });

		console.log(changedRow);
		return response.redirect('/login');
	}

	async changePassword ({ request, response, auth, params, session }) {
		if (auth.user.role === 1 || (auth.user.id === Number(params.id) && auth.user.role === 2)) {
			try {
				const passwords = request.only(['newPassword']);
				const user = auth.user;  // eslint-disable-line
				const newPassword = await Hash.make(passwords.newPassword);

				const changedRow = await User  // eslint-disable-line
					.query()
					.where('id', Number(params.id))
					.update({ password: newPassword });
				session.flash({ success: 'Password Updated Successfully' });
			} catch (error) {
				session.flash({ error: 'Password Update failed' });
				return response.redirect('/login');
			}

			return response.route('viewProfile', { id: Number(params.id) });
			// check if user is viewing their own profile
		} else {
			return response.redirect('/');
		}

		// if (isSame) {
		// const newPassword = await Hash.make(passwords.newPassword);
		// const changedRow = await User
		// .query()
		// .where('email', user.email)
		// .update({ password: newPassword });
		// console.log(changedRow);

		// return response.redirect('/');
		// }
	}
>>>>>>> e33c336a6aa57c351c356b0a32dc55f16c4a6011
}

module.exports = UserController;
