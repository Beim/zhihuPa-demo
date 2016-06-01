let nodemailer = require('nodemailer')
let user = 'beiming945@gmail.com'
let pass = 'pass'	
let _from = 'beiming945'
let to = 'beiming945@gmail.com'

let mailer = function(props){
	return {
		transporter: nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: user,
				pass: pass
			}
		}),

		mailOptions: {
			from: _from,
			to: to,
			subject: 'ZhiHu news',
			html: props.html

		},

		sendMail: function(){
			this.transporter.sendMail(this.mailOptions, function(err, info){
				if(err){
					console.log('sendMail err: ' + err)
					return 0
				}
				else{
					console.log('Message sent: ' + info.response)
					return 1
				}
			})
		}
	}
}

module.exports = mailer

