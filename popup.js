document.getElementById("saveToggle").addEventListener("click", function() {
  document.getElementById('save').style.display = 'block';
  document.getElementById('view').style.display = 'none';
});

document.getElementById("viewToggle").addEventListener("click", function() {
  document.getElementById('view').style.display = 'block';
  document.getElementById('save').style.display = 'none';
});

document.querySelectorAll('.tabButton').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tabButton').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('addStack');
  const inputField = document.getElementById('stackName');

  // Initially disable the button
  saveButton.disabled = true;

  // Enable/disable button based on input
  inputField.addEventListener('input', () => {
    const stackName = inputField.value.trim();

    if (stackName === '') {
      saveButton.disabled = true;
      return;
    }

    chrome.storage.local.get(null, (items) => {
      // Disable if stackName already exists
      saveButton.disabled = Object.keys(items).includes(stackName);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.getElementById('tabList');

  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabList.innerHTML = '';

    tabs.forEach((tab) => {
      const tabItem = document.createElement('div');
      tabItem.classList.add('tabItem');

      // Favicon image
      const favIcon = document.createElement('img');
      favIcon.src = tab.favIconUrl || 'default-icon.png';
      favIcon.alt = 'favicon';
      favIcon.width = 16;
      favIcon.height = 16;

      // Tab info
      const infoDiv = document.createElement('div');
      infoDiv.textContent = tab.title;
      infoDiv.classList.add('tabTitle');

      tabItem.appendChild(favIcon);
      tabItem.appendChild(infoDiv);
      tabList.appendChild(tabItem);
    });

    if (tabs.length === 0) {
      tabList.textContent = 'No tabs found.';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('addStack');

  saveButton.addEventListener('click', () => {
    const stackName = document.getElementById('stackName').value.trim();

    if (!stackName) {
      alert('Please enter a stack name.');
      return;
    }

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const tabData = tabs.map(tab => ({
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl
      }));

      // Save to chrome.storage.local under stack name
      chrome.storage.local.set({ [stackName]: tabData }, () => {
        // alert(`Saved ${tabs.length} tabs as "${stackName}".`);
        document.getElementById('stackName').value = ''; // optional: clear input
      });
    });
  });
});

function showSavedStacks() {
  const savedTabList = document.getElementById('savedTabList');

  chrome.storage.local.get(null, (items) => {
    savedTabList.innerHTML = '';

    let currentlyOpenTabList = null;

    const stackNames = Object.keys(items);

    if (stackNames.length === 0) {
      savedTabList.textContent = 'No saved TabStacks.';
      return;
    }

    stackNames.forEach(stackName => {
      const stackContainer = document.createElement('div');
      if(stackName != stackNames[0]) {
        stackContainer.style.background = '#ecd09e';
      }

      const stackEnd = document.createElement('div');
      stackEnd.classList.add('stackEnd');

      // === STACK HEADER ===
      const header = document.createElement('div');
      header.classList.add('tabListContainer');

      const title = document.createElement('div');
      title.textContent = stackName;

      const buttonGroup = document.createElement('div');

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('closeTab');
      removeBtn.innerHTML = '&times;';
      removeBtn.onclick = (e) => {
        e.stopPropagation(); // prevent toggle on delete click
        chrome.storage.local.remove(stackName, () => {
          showSavedStacks(); // Refresh
        });
      };

      const reopenBtn = document.createElement('button');
      reopenBtn.classList.add('reopenTab');
      reopenBtn.innerHTML = '&#8634;';
      reopenBtn.onclick = (e) => {
        e.stopPropagation(); // prevent toggle on reopen click
        items[stackName].forEach(tab => chrome.tabs.create({ url: tab.url }));
      };

      buttonGroup.appendChild(removeBtn);
      buttonGroup.appendChild(reopenBtn);
      header.appendChild(title);
      header.appendChild(buttonGroup);
      stackContainer.appendChild(header);

      // === COLLAPSIBLE TAB LIST ===
      const tabList = document.createElement('div');
      tabList.style.background = 'white';
      tabList.style.display = 'none'; // hidden by default

      items[stackName].forEach(tab => {
        const tabItem = document.createElement('div');
        tabItem.classList.add('tabItem');

        const favIcon = document.createElement('img');
        favIcon.src = tab.favIconUrl || 'default-icon.png';
        favIcon.alt = 'favicon';
        favIcon.width = 16;
        favIcon.height = 16;

        const tabInfo = document.createElement('div');
        tabInfo.style.overflow = 'hidden';

        const tabTitle = document.createElement('a');
        tabTitle.href = tab.url;
        tabTitle.textContent = tab.title;
        tabTitle.target = '_blank';
        tabTitle.classList.add('tabTitle');

        tabInfo.appendChild(tabTitle);

        tabItem.appendChild(favIcon);
        tabItem.appendChild(tabInfo);
        tabList.appendChild(tabItem);
      });

      header.addEventListener('click', () => {
        // Close the currently open list if it's not the one being clicked
        if (currentlyOpenTabList && currentlyOpenTabList !== tabList) {
          currentlyOpenTabList.style.display = 'none';
        }

        // Toggle current one
        const isCurrentlyVisible = tabList.style.display === 'block';
        tabList.style.display = isCurrentlyVisible ? 'none' : 'block';

        // Update tracker
        currentlyOpenTabList = tabList.style.display === 'block' ? tabList : null;
      });

      stackContainer.appendChild(tabList);
      savedTabList.appendChild(stackContainer);
      savedTabList.appendChild(stackEnd);
    });
  });
}
// Call this function when "View Saved Tabs" is selected
document.getElementById('viewToggle').addEventListener('click', () => {
  document.getElementById('save').style.display = 'none';
  document.getElementById('view').style.display = 'block';
  showSavedStacks();
});