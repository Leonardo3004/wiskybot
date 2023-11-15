require('dotenv').config();
const fs = require('fs');



const { exec } = require('child_process');
const { Client, IntentsBitField } = require('discord.js');

const puppeteer = require('puppeteer')
const path = require('path')
const Discord = require("discord.js");
let nuevaCadena;

const pythonIA = 'src/IA.py';
const pythonAnalisis= 'src/analisis.py';
const pythonBorrar = 'src/borrar.py';

const imagesPath = path.join(__dirname, 'images')

var tomaFoto = false;
var resultadoAnalisis= 'Nada a sido agregado';

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

const analisis = async () => {
  exec(`python ${pythonAnalisis}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  
    console.log('Python script output:');
    console.log(stdout);
  });
}

const borrar = async () => {
  exec(`python ${pythonBorrar}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  
    console.log('Python script output:');
    console.log(stdout);
  });
}
function imprimirContenidoArchivo(ruta, m) {
  fs.readFile(ruta, 'utf8', (error, datos) => {
    if (error) {
      console.error('Error al leer el archivo:', error);
      return;
    }

  
    m.reply('El resulta del analisis es: \n '+datos) ;
  });
}
const getScreenhot = async (url) => {


  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  })


  const page = await browser.newPage()

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
  console.log(tomaFoto);



  await page.goto(nuevaCadena)
  await page.click('button[class="marginTop8__83d4b marginCenterHorz__4cf72 linkButton_ba7970 button_afdfd9 lookLink__93965 lowSaturationUnderline__95e71 colorLink_b651e5 sizeMin__94642 grow__4c8a4"]')
  await page.type('input[name="email"]', 'leonardo.bol.var@gmail.com')
  await page.type('input[name="password"]', 'pinolillo12345')
  await page.click('button[type="submit"]')

  



  while (tomaFoto) {
    await page.screenshot({ path: `${imagesPath}/dashboard.png` })
    console.log("photo");


    exec(`python ${pythonIA}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
    
      console.log('Python script output:');
      console.log(stdout);
    });


    await new Promise(resolve => setTimeout(resolve, 30000));
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

  

  if (message.content === '!ayuda') {
    message.reply('A continuacion una brebe descripcion de los comandos disponibles \n -> wisky <URL del canal a analizar>: Abre el web scrapin y comienza la recoleccion de datos. (requiere que el usuario se una a la llama manualmente) \n -> borrar: Elimina los datos para crear un nuevo analisis. \n -> stop: Detiene la Recoleccion de informacion. \n -> analisis: Muestra el analisis de la informacion recolectada.');
  }

  if (message.content.startsWith('wisky')) {
    tomaFoto = true;
    nuevaCadena = message.content.slice(6);

    await getScreenhot();


  }

  if (message.content === 'analisis') {
    await analisis();
    imprimirContenidoArchivo('example.txt', message);

  }

  if (message.content === 'borrar') {
    await borrar();
    message.reply('Los datos han sido eliminados con exito');
  }

  if (message.content === 'stop') {

    tomaFoto = false;
    message.reply('se ha dejado de grabar');

  }


});

client.login("MTE2NTA5MDYwOTE3MDc1OTc3MQ.GDIq7V.zflXDDltriqA0Bt6N1f9v7NrumiVDyw_zl-h94");
