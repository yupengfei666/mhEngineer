/**
 * @author zhanglihui
 * Date: 2019/2/11
 */

export class Utils {
	timestampToTime(timestamp) {
		var date = new Date(timestamp)
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '-' : (date.getMonth() + 1) + '-'
		var D = this.change(date.getDate()) + ' '
		var h = this.change(date.getHours()) + ':'
		var m = this.change(date.getMinutes()) + ':'
		var s = this.change(date.getSeconds())
		return Y + M + D + h + m + s
	}
	// 返回日期减去分钟后的日期 
	subMinuteToTime(mimute, date = '') {
		let dateT = date ? date : this.getDateTime()
		let timestamp = new Date(dateT).getTime()
		return this.timestampToTime(timestamp - mimute * 60 * 1000)
	}
	getDateTime() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = this.change(date.getDate()) + ' '
		var h = this.change(date.getHours()) + ':'
		var m = this.change(date.getMinutes()) + ':'
		var s = this.change(date.getSeconds())
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		var currentdate = year + seperator1 + month + seperator1 + day + h + m + s;
		return currentdate;
	}
	getDate() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = this.change(date.getDate()) + ' '
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		var currentdate = year + seperator1 + month + seperator1 + day;
		return currentdate;
	}
	getDateByDate(date) {
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = this.change(date.getDate()) + ' '
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		var currentdate = year + seperator1 + month + seperator1 + day;
		return currentdate;
	}
	change(t) {
		if (t < 10) {
			return '0' + t
		} else {
			return t
		}
	}
}
