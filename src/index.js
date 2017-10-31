import message from './message.js';

function component() {
  var element = document.createElement('div');
  element.innerHTML = message;
  return element;
}
  
document.body.appendChild(component());