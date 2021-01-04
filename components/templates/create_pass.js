const create_pass_GV = data =>{
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>Hello</title>
			</head>
			<body style="margin: 0; padding:0;">
			<br />			
			<br />
			<div>Mật khẩu của bạn là ${data}</div>
			<br />
			<br />
			</body>
		</html>
	`
}
module.exports = {create_pass_GV}