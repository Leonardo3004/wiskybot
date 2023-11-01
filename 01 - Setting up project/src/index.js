require('dotenv').config();



const { Client, IntentsBitField } = require('discord.js');

const puppeteer = require('puppeteer')
const path = require('path')
const Discord = require("discord.js");
const fs = require('fs');




const imagesPath = path.join(__dirname, 'images')

var tomaFoto = false;
var espera = false;


if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', async (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  //let channel = client.channels.cache.get('1079896055023407203')

  /*await getScreenhot();*/

    
  


});

const getScreenhot = async () => {
  

  const browser = await puppeteer.launch({
    headless: false,
    slowMo:100
  })


  const page = await browser.newPage()

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
  console.log(tomaFoto);



  await page.goto('https://discord.com/channels/800529645241630730/874464936141668395')
  await page.click('button[class="marginTop8__83d4b marginCenterHorz__4cf72 linkButton_ba7970 button_afdfd9 lookLink__93965 lowSaturationUnderline__95e71 colorLink_b651e5 sizeMin__94642 grow__4c8a4"]')
  await page.type('input[name="email"]', 'leonardo.bol.var@gmail.com')
  await page.type('input[name="password"]', 'pinolillo12345')
  await page.click('button[type="submit"]')



  let cont=0;

  while (espera) {
    cont++;

    if (cont > 40){
      await page.screenshot({ path: `${imagesPath}/dashboard.png` })
      console.log("fake photo");
      cont=0;
    }
  }

  while (tomaFoto) {
    await page.screenshot({ path: `${imagesPath}/dashboard.png` })
    console.log("photo");
  }


  if (fs.existsSync(`${imagesPath}/dashboard.png`)) {
    console.log("Screenshot saved");
  }



}


client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === 'hello') {
    message.reply('hello');
  }

  if (message.content === 'wisky') {
    tomaFoto=true;
    espera=true
    await getScreenhot();
    

  }
  if (message.content === 'listo') {
 
    espera=false;
    

  }
  if (message.content === 'stop') {

    tomaFoto=false;
    

  }

  if (message.content === 'chancho') {
    message.reply('wuiiii:pig:  wuiiii:pig:  wuiiii:pig: ');
  }
  if (message.content === 'carrillo') {
    message.reply('U U U A A A :monkey: :monkey: :monkey: ');
  }


});

client.login("MTE2NTA5MDYwOTE3MDc1OTc3MQ.GDIq7V.zflXDDltriqA0Bt6N1f9v7NrumiVDyw_zl-h94");
