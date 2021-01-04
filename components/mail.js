const mailer = require('nodemailer')
const { create_pass_GV } = require('./templates/create_pass')


const getEmailData = (to, name, template, content)=>{
	let data = null

	switch (template){
		case 'create_pass_GV' :
			data = {
				from: 'Admin <phanlac1345@gmail.com>',
				to,
				subject: `Cấp mật khẩu ${name}`,
				html: create_pass_GV(content)
			}
			break
		default:
			data
	}
	return data
}


const sendEmail = (to, name, type, content) => {
	
	const smtpTransport = mailer.createTransport({		
		service: 'gmail',		 
		auth: {			
			user: 'phanlac1345@gmail.com',
			pass: 'Kamenrider1'
		}

	})

	const mail = getEmailData(to, name, type, content)

	smtpTransport.sendMail(mail, function(error, response) {
		if (error){
			console.log('err',error)
		} else {
			console.log('send mail successfuly!')
		}
	})
	smtpTransport.close()
}

module.exports = { sendEmail }