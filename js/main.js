// Status and currency values
const CURRENCY = '₽';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const NO_EXPENSE = 'Трат нет';
const NO_LIMIT = 'Не установлен';

// Button's
const addLimitBtnNode = document.getElementById('addLimitBtn');
const resetExpenseBtnNode = document.getElementById('resetExpenseBtn');
const addExpenseBtnNode = document.getElementById('addExpenseBtn');
const changeLimitBtnNode = document.getElementById('changeLimitBtn');

// Input's and Select's
const limitInputNode = document.getElementById('inputLimit');
const expenseInputNode = document.getElementById('expenseInput');
const categoryNode = document.getElementById('category');

// Form's 
const limitFormNode = document.getElementById('limitForm');
const expenseFormNode = document.getElementById('expenseForm');


// Information and History
const limitNode = document.getElementById('limit');
const totalNode = document.getElementById('total');
const statusNode = document.getElementById('status');

const historyNode = document.getElementById('history');

// Global Variables
const expenses = [];

let limit;
let sum = 0;
let expense;

//===============BUTTON'S===============

addLimitBtnNode.addEventListener('click', addLimitBtnHandler);

addExpenseBtnNode.addEventListener('click', addExpenseBtnHandler);

changeLimitBtnNode.addEventListener('click', changeLimit);

resetExpenseBtnNode.addEventListener('click', reset);

// ===============FUNCTION'S===============

init()

// Отображение начальных статусов
function init() {
    limitNode.innerText = NO_LIMIT;
    totalNode.innerText = `0 ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    historyNode.innerText = NO_EXPENSE;

    statusNode.style.color = 'green';
}

function addLimitBtnHandler(event) {
    event.preventDefault();
    limit = getLimit();

    if (!limit || limit < 0) {
        return;
    }

    renderLimit();
    changeInput();
    checkStatus();
}

function addExpenseBtnHandler(event) {
    event.preventDefault();
    expense = getExpense();

    if (!expense || expense < 0) {
        return;
    }

    let currentCategory = getCategory();

    if (!currentCategory || currentCategory === 'Выберите категорию') {
        return;
    }

    const newExpense = { current: expense, category: currentCategory};
    expenses.push(newExpense);

    renderHistory();
    calculateTotalExpense();
    clearCategory();
    renderTotal(sum);
    checkStatus();
}

// Получние лимита из поля ввода
function getLimit() {
    limit = parseInt(limitInputNode.value);
    clearInputLimit();

    return limit;
}

// Отчистка поля ввода лимита
function clearInputLimit() {
    limitInputNode.value = '';
}

// Отображение статуса лимита
function renderLimit() {
    limitNode.innerText = `${limit} ${CURRENCY}`;
}

// Изменение лимита
function changeLimit() {
    limitNode.innerText = NO_LIMIT;
    limit;
    activatedLimit();
}

// Скрытие трат и появление поля ввода лимита
function activatedLimit() {
    expenseFormNode.classList.remove('expenses__form-epxense-active');
    limitFormNode.classList.remove('expenses__form-limit-inactive');
    categoryNode.classList.add('expenses__category-inactive');
}

// Появление поля ввода трат и скрытие поля ввода лимита
function changeInput() {
    expenseFormNode.classList.add('expenses__form-epxense-active');
    limitFormNode.classList.add('expenses__form-limit-inactive');
    categoryNode.classList.remove('expenses__category-inactive');
}

// Получение трат от пользователя
function getExpense(expense) {
    expense = parseInt(expenseInputNode.value);
    clearInputExpense();

    console.log(expenses);

    return expense;
}

// Очистка поля ввода трат
function clearInputExpense() {
    expenseInputNode.value = '';
}

// Запись трат в "Всего"
function calculateTotalExpense() {
    sum += expense;

    return sum;
}

// Отображение статуса "Всего"
function renderTotal(sum) {
    totalNode.innerText = `${sum} ${CURRENCY}`;
}

// Возвращаем категорию 
function getCategory() {
    return categoryNode.value;
}

// Очистка категории 
function clearCategory() {
    categoryNode.value = '';
}

// Отрисовка истории трат
function renderHistory() {
    let expensesListHTML = '';


    expenses.forEach((expense) => {
        expensesListHTML += `<li>${expense.current} ${CURRENCY} - ${expense.category}`;
    })

    historyNode.innerHTML = `<ul>${expensesListHTML}</ul>`;
}

// Сброс списка трат
function reset() {
    totalNode.innerText = `0 ${CURRENCY}`;
    historyNode.innerHTML = NO_EXPENSE;
    expenses.length = [];
    sum = 0;
    expense = 0;
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.style.color = 'green';
}

// Проверка статуса 
function checkStatus() {
    if (limit < sum) {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - sum})`;
        statusNode.style.color = 'red';
    } if (limit >= sum) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.style.color = 'green';
    }
}