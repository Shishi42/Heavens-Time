const Discord = require('discord.js')
const config = require("./config.json")
const bot = new Discord.Client({intents: 3276799})
const cron = require("cron")

const commands_loader = require("./loaders/commands_loader")
const events_loader = require("./loaders/events_loader")

bot.commands = new Discord.Collection()
bot.color = config.bot_color
bot.log_guild = config.log_guild
bot.log_channel = config.log_channel
bot.log_channel_auto = config.log_channel_auto
bot.mods = config.bot_owners

commands_loader(bot)
events_loader(bot)

bot.login(config.token)

let auto_update = new cron.CronJob('00 00 * * * *', () => {

  bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel_auto).send("Launching Auto-Update on "+bot.guilds.cache.size+" servers.")

  let command = require(`./commands/update-ban.js`)
  for(guild of bot.guilds.cache){
    command.run(bot, null, guild[1])
  }
})

auto_update.start()


temp = []

for(guild in bot.guilds.cache){
  embed = new Discord.EmbedBuilder()
  .setColor(bot.color)
  .setTitle(`The bot has joined : ${guild.name}.`)
  .setThumbnail(guild.iconURL())
  .setDescription("Server informations :")
  .addFields(
    {name: "Name", value: guild.name},
    {name: "Server ID", value: guild.id},
    {name: "Owner", value: guild.members.cache.get(guild.ownerId).user.tag},
    {name: "Owner ID", value: guild.ownerId},
    {name: "Creation Date", value: String(guild.createdAt)},
    {name: "Member Count", value: String(guild.memberCount)},
    {name: "Is partner ?", value: String(guild.partnered)},
    {name: "Is verified ?", value: String(guild.verified)},
  )
  .setTimestamp()
  .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})
  temp.push(embed)
}
bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel).send({embeds: temp})
