import iziToast from 'izitoast';

const refs = {
  form: document.querySelector('.form'),
};

const onClickBtnForm = event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value.trim());
  const choseRadio = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choseRadio === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(response => {
      iziToast.success({
        title: 'OK',
        message: response,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: err,
        position: 'topRight',
      });
    });

  refs.form.reset();
};

refs.form.addEventListener('submit', onClickBtnForm);
