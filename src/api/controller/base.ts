import {think} from 'thinkjs';
import {errorCode} from '../../common/codeConfig/codeConfig';
import {API_ILLEGAL_LOGIN} from '../../common/codeConfig/code';

export default class extends think.Controller {
	async __before() {
		const userId = await this.session('userId');
		if (!userId) {
			return this.fail(
				errorCode.get(API_ILLEGAL_LOGIN)['code'],
				errorCode.get(API_ILLEGAL_LOGIN)['message']
			);
		}
	}
}
