const Discord = require("discord.js")

module.exports = async (bot, guild) => {

  let log_embed = new Discord.EmbedBuilder()
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

  bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel).send({embeds: [log_embed]})

  await new Promise(r => setTimeout(r, 2000))

  let command = require(`../commands/update-ban.js`)
  command.run(bot, null, guild)
}
