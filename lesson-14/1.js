/**
 * Задача 1.
 *
 * Дан базовый класс робота-уборщика.
 *
 * Добавьте роботу функционал употребления энергии:
 * - при начале уборки уровень энергии должен уменьшиться;
 * - в расчёте использовать внутренний коэффициент ENERGY_CONSUMPTION.
 *
 * Затем добавьте роботу публичный метод stop() для остановки процесса уборки.
 * В если уборка остановлена раньше времени завершения,
 * onReady сработать не должен, а также нужно вывести другое сообщение.
 *
 * Условия:
 * - заданную форму конструктора включая его параметры менять нельзя — можно только дополнять;
 * - использовать функцию clearTimeout;
 * - идентификатор таймера нужно хранить в приватной переменной конструктора.
 */

function CleanerRobot(
    initialEnergy = 0 /* Изначальный заряд батареи робота */ ,
    cleaningSquare /* Площадь для уборки в метрах. */ ,
) {
    let energy = initialEnergy;
    let timerId = 0;
    const ENERGY_CONSUMPTION = 1; /* Расход энергии: 1% батареи на 1 час работы. */
    const CLEANING_SPEED = 10; /* Скорость уборки: 10 квадратных метров в час. */

    let time = 0;


    const getCleaningTime = () => cleaningSquare / CLEANING_SPEED;

    const lowBattery = () => {
    	console.log('Уборка завершена досрочно. Батарея разрядилась');
	    clearTimeout(timerId);
    }

    const onReady = () => {
        const cleaningTime = getCleaningTime();
        let usedEnergy = energy - cleaningTime * ENERGY_CONSUMPTION;


        if(usedEnergy < 0 ){
        	lowBattery();
        }else{        	
        	console.log(`Уборка завершена. Осталось заряда батареи: ${usedEnergy}.`);
        }
    }

    this.clean = () => {
        const cleaningTime = getCleaningTime();
        time = Date.now();


        console.log(
            `Начинаю процесс уборки. Время уборки: ${cleaningTime} часов.`,
        );

        /* Для удобства время уборки сокращено до формата 1 час = 1 секунда */
        timerId = setTimeout(onReady, cleaningTime * 1000);

    };

    this.stop = () => {
        const cleaningTime = getCleaningTime();

        let spentTime = Date.now() - time;

        let usedEnergy = energy - ENERGY_CONSUMPTION * spentTime/1000;

        console.log(`Уборка завершена досрочно. Осталось заряда батареи: ${usedEnergy}`);

        clearTimeout(timerId);
    };

    // Решение
}

const cleanerRobot = new CleanerRobot(50, 45);
cleanerRobot.clean(); /* Начинаю процесс уборки. Время уборки: 4.5 часов. */

/* Спустя 4.5 секунды: Уборка завершена. Осталось заряда батареи: 45.5. */

setTimeout(() => {
    cleanerRobot.stop();  //Спустя 1 секунду: Уборка завершена досрочно. Осталось заряда батареи: 45.5. 

}, 10000);

exports.CleanerRobot = CleanerRobot;