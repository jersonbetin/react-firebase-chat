import React from 'react'

const style = {
	'marginLeft':'15px'
}

function Header({ appName, user, onAuth, onLogout }){
	function renderUserData(){
		return (
			<ul className='navbar right'>
				<li>
					<img 
						width='32'
						className='avatar circle responsive-img'
						src={user.photoURL}
					/>
				</li>
				<li>{user.displayName}</li>
				<li>
					<button
						className='waves-effect waves-light btn blue darker-1'
						onClick={onLogout}
						style={style}
					>
						Logout
					</button>
				</li>
			</ul>
		)
	}

	function renderLoginButton(){
		return (
			<ul className='right'>
				<li>
					<button
						className='waver-effect waves-light btn darker-1'
						onClick={onAuth}>
						Login
					</button>
				</li>
			</ul>
		)
	}

	return (
		<nav className='blue darker-4'>
			<div className='nav-wrapper container'>
				<a href='#' className='left brand-logo'>{appName}</a>
				{ user ? renderUserData() : renderLoginButton() }
			</div>
		</nav>
	)
}

export default Header