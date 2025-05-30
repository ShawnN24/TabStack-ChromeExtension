chrome.commands.onCommand.addListener((command) => {
  console.log("Command received:", command);
  if (command === "save-tabs") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const timestamp = new Date().toISOString();
      const defaultStackName = `TabStack ${timestamp}`;

      const tabData = tabs.map(tab => ({
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl
      }));

      chrome.storage.local.set({ [defaultStackName]: tabData }, () => {
        console.log(`Saved ${tabs.length} tabs as "${defaultStackName}"`);
      });
    });
  }
});