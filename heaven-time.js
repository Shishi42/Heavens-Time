const Discord = require('discord.js')
const config = require("./config.json")
const bot = new Discord.Client({intents: 3276799})
const cron = require("cron")

const commands_loader = require("./loaders/commands_loader")
const events_loader = require("./loaders/events_loader")

bot.commands = new Discord.Collection()
bot.color = config.bot_color

bot.main_guild = config.main_guild
bot.jury_role = config.jury_role
bot.log_channel = config.log_channel
bot.log_channel_auto = config.log_channel_auto
bot.owner = config.bot_owner

commands_loader(bot)
events_loader(bot)

bot.login(config.token)

let auto_update = new cron.CronJob('00 00 * * * *', () => {

  bot.mods = []
  for(jury of bot.guilds.cache.get(bot.main_guild).roles.cache.get(bot.jury_role).members){
    bot.mods.push(jury[0])
  }

  bot.channels.cache.get(bot.log_channel_auto).send("Launching Auto-Update on "+bot.guilds.cache.size+" servers.")
  bot.channels.cache.get(bot.log_channel_auto).send("Updated "+bot.mods.length+" members of the jury.")

  let command = require(`./commands/update-ban.js`)
  for(guild of bot.guilds.cache){
    command.run(bot, null, guild[1])
  }
})

auto_update.start()
