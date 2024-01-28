import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;
import { TOKEN_AUTH } from './const.mjs';
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer '+TOKEN_AUTH
    }
}
const per_page = 10
const user = "google"
const URL = "https://api.github.com/users/"+user+"/repos?per_page="+per_page+"&sort=stargazers_count&direction=desc"
app.get('/github_api', async (req,res)=>{
    try{
        const response = await fetch_api();
        res.status(200).json({message: response});
    }catch(error){
        res.status(500).json({message: 'Something gone wrong: '+error})
    }
})

async function fetch_api(){
    const response_api = await fetch(URL, options)
    const data =  await response_api.json()

    if (data && data.length > 0 && data[0]['owner']['login'] === 'google'){
        return data;
    }else{
        throw new Error('Dont found repositories with the user google')
    }
}
app.listen(port, () =>{
    console.log('Server listen in the port: '+ port);
})