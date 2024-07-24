let KEYBOARD_HEIGHT;
let isKeyboardOpened = false;

let caretBcr;
let touchY;

const editor = document.querySelector('#editor');
const header = document.querySelector('#header');

// блокирует проскролл от вебкита при открытии клавиатуры
editor.addEventListener('focus', () => {
  editor.classList.add('input--focused');

  window.setTimeout(() => {
    editor.classList.remove('input--focused');
  }, 10);
});

// блокирует скролл по хедеру - но вообще должен блокироваться проскролл любого
// элемента кроме редактора
// иначе touchstart по кнопке приведет к тому же самому
header.addEventListener('touchstart', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// не блокирует скролл(
// document.body.addEventListener('touchstart', (e) => {
//   e.preventDefault();
//   e.stopPropagation();
// });

// блокирует скролл документа
// но с задержкой и видимыми артефактами
window.addEventListener('scroll', (e) => {
  e.preventDefault();
  window.scrollTo(0, 0);
});

// сохраняем на случай если надо выскроллить контент из под клавиатуры
editor.addEventListener('touchstart', (e) => {
  touchY = e.pageY;
});

function updateKeyboardHeight() {
  const newHeight = Math.trunc(window.innerHeight - window.visualViewport.height);
  if (newHeight !== KEYBOARD_HEIGHT) {
    KEYBOARD_HEIGHT = newHeight;
    document.documentElement.style.setProperty('--keyboard-height', `${newHeight}px`);
  }
}

window.visualViewport.addEventListener('resize',
  () => {
    if (window.visualViewport.height < window.innerHeight) {
      console.log('resize');

      if (isKeyboardOpened) {
        return;
      }

      document.body.classList.add('keyboard-opened');
      isKeyboardOpened = true;
      updateKeyboardHeight();
      handleVirtualKeyboardOpened();
    } else {
      isKeyboardOpened = false;
      document.body.classList.remove('keyboard-opened');
    }
  });

function handleVirtualKeyboardOpened() {
  const KEYBOARD_TOP = window.innerHeight - KEYBOARD_HEIGHT;
  let scrollDistance = caretBcr.bottom - KEYBOARD_TOP;

  if (touchY < caretBcr.y) {
    scrollDistance -= caretBcr.height;
  }

  scrollDistance = Math.ceil(scrollDistance);
  console.log(scrollDistance);

  if (scrollDistance > 0) {
    editor.scrollTo({
      left: 0,
      top: editor.scrollTop + scrollDistance,
      behavior: 'smooth',
    });
  }
}

document.addEventListener('selectionchange', () => {
  const selection = document.getSelection();

  if (!selection?.rangeCount) {
    return;
  }

  const range = selection.getRangeAt(0);
  caretBcr = range.getBoundingClientRect();
});
