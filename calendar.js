const calendarMonth = document.querySelector('.month');
const calendarDates = document.querySelector('.dates');

const year = 2026;
const month = 9; //октябрь - 9 по счету, так как счет начинается с 0

// отображение названия месяца и год
calendarMonth.textContent = new Date(year, month, 1) //textContent - свойство, которое позволяет прочитать или заменить текст внутри элемента.
// new Date - это Date(year,month,day)
    .toLocaleDateString('ru-RU', { //toLocaleDateString() - Этот метод превращает дату в текст с учётом языка и настроек оформления.
    //Синтаксис - Date.toLocaleDateString(locales, options)
        month: 'long', // Просит вывести полное название месяца: октябрь, а не его номер.
        year: 'numeric' // Просит вывести год числом: 2026
    });



// !!!!Важно: month внутри объекта настроек — это название свойства, а не обращение к нашей переменной month.!!!!



// кол-во дней в месяце
const daysCount = new Date(year, month + 1, 0).getDate(); // getDate() - возвращает день месяца (от 1 до 31)
// Зачем день - 0? Нулевой день месяца — последний день предыдущего месяца.

// узнаем, в какой столбец поставить первое число 
const firstDay = new Date(year, month, 1).getDay(); // getDay() - возвращает день недели (от 0 до 6)
const offset = (firstDay + 6) % 7; //offset - кол-во свободных ячеек до начала месяца. Эта строчка начинает неделю с пн, так как getDay начинается с вс по умолчанию

for (let day = 1; day <= daysCount; day++) {
    const button = document.createElement('button');
    button.type = 'button';

    const time = document.createElement('time'); //Тег time обозначает дату или время. Он помогает передать смысл содержимого, но сам по себе не создаёт календарь и не добавляет поведения.
    time.textContent = day; // Помещаем текущее значение day внутрь <time>.

    // формируем дату вида 2026-10-01
    time.dateTime =
        `${year}-${month}-${day}`;

    button.setAttribute( // метод setAttribute устанавливает HTML-атрибут. Синтаксис: элемент.setAttribute('название-атрибута', 'значение');
        'aria-label',
        new Date(year, month, day).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    );

    if (day === 1) { //есть день равен 1, то кнопка встает в 4 колонку
        button.style.gridColumnStart = offset + 1;
    }

    button.append(time);
    calendarDates.append(button);
}

