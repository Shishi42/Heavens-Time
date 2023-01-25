const Discord = require("discord.js")

module.exports = {

  name: "list-ban",
  description: "Show ban-list",
  permission: null,
  dm: true,
  category: "Ban",

  async run(bot, message, args) {

    let bans = await bot.Bans.findAll()
    let content = ""

    for(ban of bans){
      await bot.users.fetch(ban.dataValues.id).then(discord_user => {
        content += `- **${discord_user.tag}** | \`${ban.dataValues.reason}\`\n`
      })
    }

    let embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle("Heaven's Time list of bans")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`Total number of bans : ${bans.length}`)
    .addFields({name: "Ban-list", value: String(content)})
    .setTimestamp()
    .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})
    message.reply({embeds: [embed]})

    let log_embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Ban-List asked on : ${message.guild.name}.`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`Ban-List asked by ${message.member.user.tag}.`)
    .setTimestamp()
    .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})
    return bot.channels.cache.get(bot.log_channel).send({embeds: [log_embed]})
  }
}
