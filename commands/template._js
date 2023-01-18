const Discord = require("discord.js")

module.exports = {

  name: "nom",
  description: "description",
  permission: null,
  dm: true,
  category: "catégorie",
  options: [
    {
      type: "string",
      name: "exemple",
      description: "description de l'option",
      required: false,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    message.reply("Exemple")
  }
}
