import React, {Component}  from 'react'
import firebase from 'firebase'

import Header from './header'
import Chat from './chat'

class App extends Component{
	constructor(){
		super()
		this.handleAuth = this.handleAuth.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.renderChat = this.renderChat.bind(this)
		this.state = {
			user:null
		}
	}

	componentWillMount(){

		firebase.auth().onAuthStateChanged( user => {
			if(user){
				this.setState({ user: user})
			}else{
				this.setState({ user: null })
			}
		})
	}

	handleAuth(){
		const provider = new firebase.auth.GoogleAuthProvider()
		firebase.auth().signInWithPopup(provider)
			.then(result => console.log(`${result.user.email} ha iniciado sesion`))
			.catch(error => console.log(`Ha ocurrido un error: ${error.message}`))

	}

	handleLogout(){
		firebase.auth().signOut()
			.then(() => console.log('Desconectado'))
			.catch(error => console.log(`Error : ${error.message}`))
	}


	renderChat(){
		if(this.state.user){
			return <Chat user = { this.state.user}/>
		}else{
			return <div>Debes estar logeado</div>
		}
	}

	render(){
		return (
			<div>
				<Header
					appName='React Chat'
					user = {this.state.user}
					onAuth = {this.handleAuth}
					onLogout = {this.handleLogout}
				/>			
				<div className='message-chat-list container'>
					<br/>
					{ this.renderChat() }				
				</div>		
			</div>
		)
	}
}

export default App