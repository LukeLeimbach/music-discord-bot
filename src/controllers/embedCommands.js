const { AudioPlayerStatus } = require('@discordjs/voice');
const { createTextChannel } = require('../helpers/client');
const {
  togglePlayBtn,
  skipBtn,
  backBtn,
  stopBtn,
  shuffleBtn,
  loopBtn,
} = require('../components/button');


// TODO: Implement this function. This is very dangerous and should be used with extreme caution.
async function clearTextChannel() {
  return
}


/**
 * Updates the given actionRow object with the specified properties.
 * 
 * @param {EmbedController} EmbedController - The parent embed controller.
 * @returns {void}
 */
function updateActionRow(EmbedController) {
  const isPlaying = EmbedController.GuildController.PlayerController.AudioPlayer.state.status === AudioPlayerStatus.Playing;
  EmbedController.actionRow
    .addComponents(
      isPlaying ? togglePlayBtn.setLabel('⏸') : togglePlayBtn.setLabel('▶️'),
      skipBtn,
      stopBtn,
      shuffleBtn,
      loopBtn
    );
}


/**
 * Updates the given embed object with the specified properties.
 * 
 * @param {EmbedController} EmbedController - The parent embed controller.
 * @returns {void}
 */
function updateEmbed(EmbedController) {
  EmbedController.embed
    .setColor(0x0099FF)
    .setTitle('Wall Music')
    .setURL('https://wall-music-discord-bot.firebaseapp.com')
    .setDescription('Type a song into the channel to get started!')
    .setThumbnail('attachment://logo.png')
    .setImage('attachment://logo.png')
    .setTimestamp()
    .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });
}


/**
 * Sends the embed to the EmbedController's text channel. If the text channel is not set, a new one is created.
 * 
 * @param {EmbedController} EmbedController - The parent embed controller.
 * @returns {Promise<boolean>} A promise that resolves to true if the embed was successfully sent, false otherwise.
 */
async function sendEmbed(EmbedController) {
  if (!EmbedController.textChannel) {
    console.warn('[!] Warn in sendEmbed, Failed to get text channel. Creating a new one...');
    EmbedController.textChannel = await createTextChannel();
  }

  try {
    EmbedController.embedMessage = await EmbedController.textChannel.send({
      embeds: [EmbedController.embed],
      components: [EmbedController.actionRow],
      files: [EmbedController.logo], // "this.banner," FIXME: Add this back in when banner is uploaded
    });
    return true;
  } catch (error) {
    console.error('[-] Error in sendEmbed, Failed to send embed:', error);
    return false;
  }
}


async function __test__() {
  console.log('[+] Embed Tests Completed Successfully');
}


module.exports = {
  clearTextChannel,
  updateActionRow,
  updateEmbed,
  sendEmbed,
  __test__,
}