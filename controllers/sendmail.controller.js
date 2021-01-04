const { sendEmail } = require('./../components/mail')

const methods = {
	sendmail : (req,res)=>{
		//console.log({req.body})
		const { name, email, pass } = req.body
		sendEmail(email, name, 'create_pass_GV',pass)
	}
}

module.exports = methods
