const Discord = require("discord.js")

module.exports = {

  name: "add-ban",
  description: "Add someone to the ban-list",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: true,
  category: "Ban",
  options: [
    {
      type: "user",
      name: "user",
      description: "The user to ban",
      required: true
    },
    {
      type: "string",
      name: "reason",
      description: "The reason behind the ban",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    user = args.get("user").value
    reason = args.get("reason").value

    await message.deferReply()

    if(!bot.mods.includes(message.member.id)) return message.editReply("You can't use this command because you are not an authorized moderator.")

    let ban = await bot.Bans.findOne({where: {id: user}})
    if(ban) return message.editReply(`This user is already banned. (reason : ${ban.get('reason')})`)

    else{
      bot.users.fetch(user).then(discord_user => {

        let embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Do you confirm the ban of ${discord_user.tag} ?`)
        .setThumbnail(discord_user.displayAvatarURL({dynamic: true}))
        .setDescription(`For the reason : \`${reason}\``)
        .setTimestamp()
        .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

        const row = new Discord.ActionRowBuilder()
  			.addComponents(
  				new Discord.ButtonBuilder()
            .setCustomId("confirm_ban")
            .setLabel("Confirm")
            .setStyle(Discord.ButtonStyle.Success),
          new Discord.ButtonBuilder()
            .setCustomId("cancel_ban")
            .setLabel("Cancel")
            .setStyle(Discord.ButtonStyle.Danger)
  			)
        const collector = message.channel.createMessageComponentCollector({ time: 15000 })

        message.editReply({embeds: [embed], components: [row]})

        collector.on('collect', async i => {
          await i.deferUpdate()
          if (i.customId === 'confirm_ban') {
            if(await bot.Bans.findOne({where: {id: user}}) == null){
              await bot.Bans.create({
                id: discord_user.id,
                reason: reason,
              })
            }

            let count = 0
            for(guild of bot.guilds.cache){
              let member = guild[1].members.cache.get(discord_user.id)
              if(member?.bannable || member == undefined){
                guild[1].bans.create(discord_user.id, {reason: `[HT] Auto-ban : ${reason}`})
                count++
              }
            }

            let log_embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`${discord_user.tag} has been banned.`)
            .setThumbnail(discord_user.displayAvatarURL({dynamic: true}))
            .setDescription(`For the reason : \`${reason}\`\n Banned by ${message.member.user.tag}`)
            .addFields({name: "Number of server who banned it", value: String(count)})
            .setTimestamp()
            .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})
            bot.channels.cache.get(bot.log_channel).send({embeds: [log_embed]})

            return await i.editReply(`User has been banned on ${bot.guilds.cache.size} servers.`)
          } else if (i.customId === 'cancel_ban') {
            return await i.editReply("Ban canceled.")
          }
        })
      })
    }
  }
}
