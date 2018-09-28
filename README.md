# Табло рейсов
Адаптивное приложение "Табло рейсов" на React
## Задача
Разработайте клиентское приложение (сайт), где будет табло аэропорта. У табло должны быть следующие функции:
* просмотр только вылетающих рейсов 
* просмотр только прилетающих рейсов 
* просмотр задержанных рейсов
* поиск по номеру рейса
## Проверка
Установка всех пакетов
```
npm i
```
Получение данных происходит от локального сервера, поэтому первым делом нужно установить
json-server
```
npm i -g json-server
```
Затем запустить сервер
```
json-server --watch flights.json
```
Во втором терминале запустить webpack сервер
```
npm run dev
```
## Дополнительное задание Ticker
Почему this._i не увеличивается. Как исправить?
```
function Ticker() { 
  this._i = 0
};

Ticker.prototype = { 
  tick: function() {
    console.log(this._i++); 
  }
};

var ticker = new Ticker();
setInterval(ticker.tick, 1000);
```
### Ответ
this._i не увеличивается, потому что в setInterval передается только ссылка на метод tick прототипа объекта Ticker, из-за чего теряется контекст this. 
Есть два способа решить данную проблему:
* Привязать контекст напрямую
```
setInterval(ticker.tick.bind(ticker), 1000);
```
* Обернуть ссылку на метод в анонимную функцию, тогда  сработает вызов метода, а контекст достанется из замыкания
```
setInterval(function() {
  ticker.tick()
}, 1000);
```