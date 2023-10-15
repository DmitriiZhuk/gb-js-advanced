"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные
сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для
отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако
если длина введенного отзыва менее 50 или более 500 символов, функция должна
генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных
при запуске вашего приложения.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const productsSelect = document.querySelector("#productField");
const reviewField = document.querySelector("#reviewField");
const reviewForm = document.querySelector("#reviewForm");
const reviewsList = document.querySelector("#reviewList");
const errorField = document.querySelector("#errorField");

let currentReviewId = getCurrentReviewId();

// Заполнение выпадающего списка товаров
initialData.forEach((item) => {
  const field = `<option value="${item.product}">${item.product}</option>`;
  productsSelect.insertAdjacentHTML("beforeend", field);
});

function getCurrentReviewId() {
  return initialData.reduce((max, review) => {
    const maxReviewId = review.reviews.reduce((a, r) => Math.max(a, r.id), 0);
    return Math.max(max, maxReviewId);
  }, 0);
}

function renderError(msg) {
  errorField.textContent = msg || "";
}

function renderReviews() {
  reviewsList.innerHTML = "";
  initialData.forEach(renderProductReviews);
}

function renderProductReviews(item) {
  const field = `<dt>${item.product}</dt>`;
  const subField = `<dd><ul>${item.reviews.reduce(
    (str, review) => str + `<li>${review.text}</li>`,
    ""
  )}</ul></dd>`;
  const insertStr = field + subField;
  reviewsList.insertAdjacentHTML("beforeend", insertStr);
}

renderReviews();

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderError();

  try {
    const selectedProduct = productsSelect.value;
    const selectedProductData = initialData.find(
      (item) => item.product === selectedProduct
    );

    if (!selectedProductData) {
      throw new Error("Продукт не выбран");
    }

    const reviewText = reviewField.value;
    if (reviewText.length < 50 || reviewText.length > 500) {
      throw new Error("Обзор должен бьты от 50 и до 500 символов");
    }

    selectedProductData.reviews.push({
      id: ++currentReviewId,
      text: reviewText,
    });
  } catch (error) {
    renderError(error.message);
  } finally {
    renderReviews();
  }
});
