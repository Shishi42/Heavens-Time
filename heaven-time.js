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
bot.mods = config.bot_owners

commands_loader(bot)
events_loader(bot)

bot.login(config.token)

let auto_update = new cron.CronJob('00 * * * * *', () => {

  bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel).send("Launching Auto-Update on "+bot.guilds.cache.size+" servers.")

  let command = require(`./commands/update-ban.js`)
  for(guild of bot.guilds.cache){
    command.run(bot, null, guild[1])
  }
})

auto_update.start()
