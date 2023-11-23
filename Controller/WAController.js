const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    // console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 

const api = async (req, res) =>  {
    let numberPhone = req.query.numberPhone  || req.body.numberPhone;
    let pesan =  req.query.pesan || req.body.pesan
    let password = req.query.password || req.body.password
    const passwordApp = "@12345789opuiY"
    try {

        if(password !== passwordApp){
            return res.status(401).json({isSucceeded : false, message : "Password Salah"})
        }

        if (numberPhone.startsWith("0")){
            numberPhone = "62" + numberPhone.slice(1) + "@c.us"
        }else if(numberPhone.startsWith("62")){
            numberPhone = numberPhone + "@c.us";
        }else{
            numberPhone = "62" + numberPhone + "@c.us"
        }

        const user = await client.isRegisteredUser(numberPhone);

        if(user){
            client.sendMessage(numberPhone, pesan);
            res.json({isSucceeded : true, message : "Pesan Berhasil Terkirim"})
        }else{
            res.json({isSucceeded : false, message : `No Whatsapp ${req.body.numberPhone ||req.query.numberPhone} Tidak ditemukan`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({isSucceeded : false, message : "Server Ini Error"})
    }

};

module.exports = api;