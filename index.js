const editor_ = document.querySelector('#editor');
const prompt_ = document.querySelector('#prompt');

// нажали на редактор - поднялся тулбар, промпт остался под клавой
editor_.addEventListener('focus', () => {
  document.body.classList.toggle('editor-focused');
});
editor_.addEventListener('blur', () => {
  document.body.classList.toggle('editor-focused');
});

// нажали на промпт - поднялся промпт, тулбар не видно
prompt_.addEventListener('focus', () => {
  document.body.classList.toggle('prompt-focused');
});
prompt_.addEventListener('blur', () => {
  document.body.classList.toggle('prompt-focused');
});
