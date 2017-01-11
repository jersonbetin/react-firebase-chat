import React, { Component, PropTypes } from 'react'
import firebase from 'firebase'

import ChatMessage from './chatMessage'
import ChatInput from './chatInput'

const BOT_AVATAR = 'data:image/jpeg;base64,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'
const BOT_NAME = 'Jarvis'

class Chat extends Component{
	constructor(props){
		super(props)
		this.state = {
			messages: [],
			count: 0
		}
		this.messagesDB = firebase.database().ref().child(`messages/${this.props.user.uid}`)
		this.handleSendMessage = this.handleSendMessage.bind(this)
	}

	componentWillMount(){
		this.messagesDB.on('child_added', snap => {
			this.setState({
				messages: this.state.messages.concat(snap.val())
			})
		})
	}

	componentWillUnmount(){
		this.messagesDB.off();
	}

	handleSendMessage(text){
		let newMessage = this.messagesDB.push()
		let msg = {
			text,
			avatar: this.props.user.photoURL,
			displayName: this.props.user.displayName,
			date: Date.now()
		}
		newMessage.set(msg)

		//El bot responde
		if(this.state.count < 1){
			//si es el primer mensaje
			this.setState({ count:this.state.count + 1 })
			this._handleBotMessage('bienvenida')
		}else if(this.state.count > 4){
			//mas de 4 interacciones
			this.setState({ count:this.state.count + 1 })
			this._handleBotMessage('despedida')
		}else{
			// Si es el siguiente y contiene alguna palabra "mágica"
      this.setState({ count: this.state.count +1 })
      msg.text = msg.text.toLowerCase()
      console.log(msg)

      if (msg.text.includes('react'))
       this._handleBotMessage('react')
     	else if (msg.text.includes('android'))
     	 this._handleBotMessage('android')
      else if (msg.text.includes('angular'))
       this._handleBotMessage('angular')
      else if (msg.text.includes('javascript')) 
      	this._handleBotMessage('javascript')
      else if (msg.text.includes('polymer')) 
      	this._handleBotMessage('polymer')
      else if (msg.text.includes('java')) 
      	this._handleBotMessage('Java')
      else if (msg.text.includes('python')) 
      	this._handleBotMessage('Python')
      else if (msg.text.includes('patata')) 
      	this._handleBotMessage('patata')
      else 
      	this._handleBotMessage('default')
		}
	}

	_handleBotMessage(word){
		firebase.database().ref().child(`bot/${word}`).once('value')
			.then(snap => {
				let newBotMessage = this.messagesDB.push()
				setTimeout(() =>{
					newBotMessage.set({
						text: snap.val(),
						avatar: BOT_AVATAR,
						displayName: BOT_NAME,
						date: Date.now()
					})
				}, 1200)
			})
	}

	render(){
		return (
			<div>
				<div className='container'>
					{
						this.state.messages.map(msg => (
							<ChatMessage 
								key={msg.date}
								message={msg}
							/>
						)).reverse()
					}
				</div>
				<ChatInput onSendMessage={this.handleSendMessage} />
			</div>
		)
	}
}


Chat.propTypes  = {
	user: PropTypes.object.isRequired
}

export default Chat