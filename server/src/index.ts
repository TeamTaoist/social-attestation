import "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

/// twitter Config
const BearerToken = process.env.TWITTER_BEARER_TOKEN;
const ClientID = process.env.TWITTER_APP_CLIENT_ID;
const ClientSecret = process.env.TWITTER_APP_CLIENT_SECRET;

const port = 8888;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/twitter/get_id/:userName", function (req, res) {
    var params = req.params;
    console.debug("=====", params.userName)
    axios({
        method: "get",
        url: `https://api.twitter.com/2/users/by?usernames=${params.userName}`,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${BearerToken}`
        }
    }).then((dataResult) => {
        res.send(dataResult.data);
    }).catch((error) => {
        res.status(500).send(error);
    });
})


app.post("/auth_callback/twitter", function (req, res) {
    var params = req.params;
    console.debug("=====", params)


    var body = req.body;
    console.debug("======body", body);


    // todo: add ethereum wallet signature from client

    var formdata = {
        "client_id": ClientID,
        "client_secret": ClientSecret,
        "grant_type": "authorization_code",
        "code_verifier": "challenge",
        "code": req.body.code,
        "redirect_uri": req.body.redirect_uri,
    }

    axios({
        method: "post",
        url: `https://api.twitter.com/2/oauth2/token`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        data: axios.toFormData(formdata)
    }).then((dataResult) => {
        res.send(dataResult.data);
    }).catch((error) => {
        res.status(500).send(error);
    });
})


app.get("/alive", function (req, res) {
    var params = req.params;
    res.send("ok");
})

app.listen(port, () => {
    console.log(`SA listening on http://127.0.0.1:8888`)
})