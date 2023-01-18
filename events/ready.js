const Discord = require('discord.js')
const sqlite3 = require("sqlite3")
const slashcommands_loader = require("../loaders/slashcommands_loader")

module.exports = async bot => {

  await slashcommands_loader(bot)

  bot.db = new sqlite3.Database("majins.db")

  console.log(`Connecté en tant que ${bot.user.tag}!`)

  bot.user.setPresence({activities: [{ name: "Holy Ground", type: 2 }], status: 'online'})
}
