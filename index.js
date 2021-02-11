const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const token = config.token
const prefix = config.prefix
const Default = config.default.statut
const defaultMessage = config.default.message

client.login(process.env.TOKEN)

client.on("ready", () => {
    if(Default === true){
        client.user.setActivity(defaultMessage, {
            type: "STREAMING",
            url: "https://www.twitch.tv/nyrok_le_streamer_zebi"
        });
        return console.log("Le selfbot et le statut streaming sont fonctionnels.")
    }
    else if(Default === false) return console.log("Le selfbot a été activé avec succès tandis que le statut streaming est désactivé comme indiqué dans les configurations.")
    else return console.log("Je crois qu'il y'a un problème, voit avec Nyrok et casse pas les couilles")
})

client.on("message", message => {
    if(!message.author.id === client.user.id) return
    if(message.content.startsWith(prefix + "stream")){
        let args = message.content.split(" ").slice(1)
        let msg = args.join(" ")
        message.delete()
        client.user.setActivity(msg, {
            type: "STREAMING",
            url: "https://www.twitch.tv/nyrok_le_streamer_zebi"
        });
        return console.log("Le nouveau statut est : "+msg);
    }
    if(message.content.startsWith(prefix + "clear")){
        message.delete()
        client.user.setActivity({type: ""}).catch(console.error)
        return console.log("Le statut a été supprimé avec succès");
    }
})