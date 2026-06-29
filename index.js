const generatePasswordBtn = document.querySelector('.generate-passwords-btn');
const displayPassword = document.querySelectorAll('.pw-display');
const changePasswordLength = document.querySelector('.change-password-length');
const toast = document.getElementById('toast');

const characters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 
  'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
  'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '*', '&', '$', '#', '!', '?', '<', '>', '+'
];

function generatePassword(length = 12) {
  const pwArr = [];
  
  for (let j = 0; j < 4; j++) {
    let resultStr = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      resultStr += characters[randomIndex];
    }
    pwArr.push(resultStr);
  }
  
  return pwArr;
}

function renderPassword() {
  // Grab the current value from the input field
  let length = parseInt(changePasswordLength.value);
  
  // Basic validation to keep length within reasonable bounds
  if (length < 8) length = 8;
  if (length > 24) length = 24;

  let passwords = generatePassword(length);

  for (let i = 0; i < displayPassword.length; i++) {
    displayPassword[i].textContent = passwords[i];
  }
}

// Copy to Clipboard Feature
displayPassword.forEach(box => {
    box.addEventListener('click', (e) => {
        const text = e.target.textContent;
        if (!text || text === "••••••••••••") return; // Don't copy placeholder
        
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        });
    });
});

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

generatePasswordBtn.addEventListener('click', renderPassword);