const user1SelectorBtn = document.querySelector('#user1-selector')
const user2SelectorBtn = document.querySelector('#user2-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Customer' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  chatMessages.innerHTML = ''
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Customer'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Customer') {
    user1SelectorBtn.classList.add('active-person')
    user2SelectorBtn.classList.remove('active-person')
  } else {
    user2SelectorBtn.classList.add('active-person')
    user1SelectorBtn.classList.remove('active-person')
  }

  chatInput.focus()
}

user1SelectorBtn.onclick = () => updateMessageSender('Customer')
user2SelectorBtn.onclick = () => updateMessageSender('Barista')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  chatMessages.innerHTML += createChatMessageElement(message)

  chatInputForm.reset()

  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})
