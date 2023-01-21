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
  
  bot.guilds.forEach(guild => {
    console.log(guild)
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
    bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel).send({embeds: embed})
  })
}
