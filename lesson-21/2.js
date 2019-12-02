/*
# Задача 2

Создайте функцию `getCustomers` которая умеет объединять 2 массива с объектами.

Операция объединения происходит по ключу `id` и только для объектов у которых установлен флаг `verified: true`.

**Обратите внимание**:

1. Функция `getCustomers` должна возвращать промис;
2. Использование `async & await` **запрещено**;
3. Использование посторонних библиотек **запрещено**;
4. В том случае если в массиве `countries` отсутствует необходимый `id` промис **должен** реджектится с текстом `We don't have information about country for this customer: ${customer.name}`;
5. Склеивание происходит **только** для объектов с флагом `verified: true`.
*/

// Решение
function getCustomers(arr1, arr2) {
    return new Promise((resolve, reject) => {

        let obj = {};
        let obj2 = {};

        arr1.forEach((el) =>{
            if(el.hasOwnProperty('verified')) {
                console.log(el);
                obj = el;
            }
        });

        arr2.forEach((el) =>{
            if(el.hasOwnProperty('verified')) {
                obj2 = el;
            }
        });

       Promise.all([...arr1, ...arr2]).then((el) => {
            console.log(el);
            el.forEach((elem) => {
                
            })
       })
        
    })


}

// Пример использования

const customers = [
    {
        id: 'A1',
        name: 'Oliver',
        verified: true
    },
    {
        id: 'A2',
        name: 'alex'
    }
];

const countries = [
    {
        id: 'A1',
        verified: true,
        country: 'usa',
    },
    {
        id: 'A2',
        country: 'poland'
    }
];

getCustomers(customers, countries)
    .then((customers) => console.log(customers))
    .catch(error => console.log(error))
