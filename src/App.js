import React, { useEffect } from 'react'
import './App.css'

var CLIENT_ID = '194663501672-ju3ki8lc4nndu61kepal8jhlsoiqcfu1.apps.googleusercontent.com' /** @PORT_3000 */
// var CLIENT_ID = '194663501672-32u3cu1778ddsdbaboo5nhuorja99q27.apps.googleusercontent.com' /** @PORT_5000 */
// var CLIENT_ID = '' /** @NETLIFY */

var API_KEY = 'AIzaSyBX1t5TxThJyOn_hc87Uq5Y_ggTMr1mSrY'

var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']

var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'

const initClient = () => {
	window.gapi.client
		.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES
		})
		.then(
			() => {
				console.log('success')
				updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get())
			},
			error => {
				console.log(error)
			}
		)
}

function updateSigninStatus(isSignedIn) {
	console.log(isSignedIn)
	if (isSignedIn) {
		window.gapi.client.drive.files
			.list({
				pageSize: 10,
				fields: 'nextPageToken, files(id, name)'
			})
			.then(function(response) {
				alert(response.result.files[0].name)
			})
	}
}

const api = () => {
	const script = document.createElement('script')
	script.src = 'https://apis.google.com/js/api.js'
	script.onload = () => {
		window.gapi.load('client:auth2', initClient)
	}
	document.body.appendChild(script)
}

function App() {
	useEffect(() => {
		api()
	}, [])

	const handleAuthClick = () => {
		console.log('auth clicked')
		window.gapi.auth2.getAuthInstance().signIn()
	}

	return (
		<div className='App'>
			<p>Drive API</p>
			<button onClick={() => handleAuthClick()}>Authorize</button>
			<button style={{ display: '' }}>Sign Out</button>
		</div>
	)
}

export default App
