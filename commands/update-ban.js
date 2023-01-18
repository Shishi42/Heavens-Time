const Discord = require("discord.js")

module.exports = {

  name: "update-ban",
  description: "Update ban-list of the server",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Ban",

  async run(bot, message, args) {

    let guild

    if(message != null){
      guild = message.guild
      await message.deferReply()
    }else{
      guild = await bot.guilds.fetch(args)
    }

    let bans = await bot.Bans.findAll()
    let count = 0

    for(ban of bans){
      let member = guild.members.cache.get(ban.dataValues.id)
      if(member?.bannable || member == undefined){
        guild.bans.create(ban.dataValues.id, {reason: `[HT] Auto-ban : ${ban.dataValues.reason}`})
        count++
      }
    }

    if(message){
      let log_embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Manual update required on : ${guild.name}.`)
      .setThumbnail(guild.iconURL())
      .setDescription(`Update required by ${message.member.user.tag}.`)
      .addFields({name: "Number of added bans", value: String(count)})
      .setTimestamp()
      .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

      bot.guilds.cache.get(bot.log_guild).channels.cache.get(bot.log_channel).send({embeds: [log_embed]})
      return await message.editReply("Done. ✔️")

    }
  }
}
