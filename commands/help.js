const Discord = require("discord.js")

module.exports = {

  name: "help",
  description: "Show help menu",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {

    let embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle("Heaven's Time Help Menu")
    // .setAuthor({name: "a BOT by @Shishi4272", iconURL: "https://twitter.com/api/users/profile_image/shishi4272", url: "https://twitter.com/shishi4272"})
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`Thanks for using the bot, here's a description on how it works.`)
    .setTimestamp()
    .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})
    .addFields(
      {name: "Goal of this system", value: "The goal of this bot is to create a safe-place around all Inazuma Eleven Communities by banning toxic peoples from all servers at once."},
      {name: "Fully Automatic", value: "This bot operates by itself, it will search when it joins your server and then every hour for the ban-list and then proceed to ban the community-sized banned peoples on your server."},
      {name: "Troubleshoot", value: "In the case of you noticing that the bot is not working on your server, please check that the bot has the required permissions to ban someone on your server.\n If you don't want to wait for the bot to trigger every hour please run slash command `update-ban`."},
      {name: "Adding People to the ban-list", value: "Only **REALLY** toxic people will be banned by this system, we will **NOT** ban someone for only dropping an insult on a server for exemple.\n That's why every case needs to be examined by our fair and neutral group of moderators before proceeding to a ban.\n\nIf you think that someone needs to be banned, please contact us with details."},
      {name: "Adding the bot to a server", value: "https://discord.com/api/oauth2/authorize?client_id=1065208131120021544&permissions=2147601476&scope=bot%20applications.commands"},
      {name: "Contact", value: "If you need any help please contact us on Twitter for the moment. (@shishi4272)"},
    )

    await message.reply({embeds: [embed]})
  }
}
