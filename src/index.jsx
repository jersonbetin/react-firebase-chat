import React, {Component} from 'react'
import {render} from 'react-dom'
import firebase from 'firebase'

import AppComponent from './components'
import config from './config'

firebase.initializeApp(config)

render(<AppComponent />, document.getElementById('root'))