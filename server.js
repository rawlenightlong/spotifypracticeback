const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const clientSecret = process.env.CLIENT_SECRET
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "0f1031b22d464246bd89f46eea042924",
        clientSecret: clientSecret,
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    }).catch(error => {
        res.send(error)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "0f1031b22d464246bd89f46eea042924",
        clientSecret: clientSecret
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("Hey there, Delilah, what's it like in Port 3001?"
    )
})