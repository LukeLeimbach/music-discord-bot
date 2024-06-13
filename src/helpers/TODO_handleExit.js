// // Handle exit proceedures 
// process.stdin.resume(); // so the program will not close instantly

// function exitHandler(exitCode) {
//   console.log(exitCode == 'SIGINT' ? '[!] Ctrl+C Detected' : exitCode == 0 ? '[...] Exiting Program' : `[+] Exit code: ${exitCode}`);

//   // On exit to program
//   if (exitCode == 'SIGINT') {
// 		// Handle voice player
// 		if (voiceState.subscription) {
// 			voiceState.subscription.unsubscribe();
// 			console.log("[+] Player has been unsubscribed");
// 		}

// 		if (voiceState.connection) {
// 			if (voiceState.connection.disconnect()) console.log("[+] Player disconnected");
// 			if (voiceState.connection.destroy()) console.log("[+] Connection Destroyed");
// 		}

//     // console.log("[...] Sending embed message ID to Firestore")
//     // console.log("[+] Sent embed message ID to Firestore")
//   }
//   process.exit(1);
// }

// // do something when app is closing
// process.on('exit', exitHandler.bind(null));

// // catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null));

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null));
// process.on('SIGUSR2', exitHandler.bind(null));

// // catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null));