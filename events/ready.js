const slashcommands_loader = require("../loaders/slashcommands_loader")
const Sequelize = require("sequelize")

module.exports = async bot => {

  await slashcommands_loader(bot)

  bot.db = new Sequelize({
    dialect: 'sqlite',
    storage: './majins.db'
  })

  bot.Bans = bot.db.define('ban', {
  	id: {
  		type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
  	},
  	reason: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  })

  bot.Bans.sync()
  console.log(`Database online`)

  console.log(`Connecté en tant que ${bot.user.tag}!`)

  bot.user.setPresence({activities: [{ name: "Holy Ground", type: 2 }], status: 'online'})

  bot.mods = []
  for(jury of bot.guilds.cache.get(bot.main_guild).roles.cache.get(bot.jury_role).members){
    bot.mods.push(jury[0])
  }
}
