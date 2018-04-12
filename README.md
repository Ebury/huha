# huha.js #

![Chimo Bayo GIF](https://img.buzzfeed.com/buzzfeed-static/static/2015-07/9/15/enhanced/webdr06/anigif_enhanced-28562-1436468716-8.gif?downsize=715:*&output-format=auto&output-quality=auto)

huha.js (Hyperactive Users Hint Analysis) is a JavaScript 
framework that measures the usability and user experience
in an automated way, including the limitations of the 
model and the best practices.

## Documentation ##

### Installation ###

NPM is the recommended installation method

```
npm install @ebury/huha --save
```

Then you can import the `Huha` class in your application

```javascript
import Huha from '@ebury/huha'
```

### Reference ###

#### `Huha` class ####

Method | Description |
------------- | ------------- |
`constructor(options)` | Instantiates a new `Huha` class with the given `options`. The `options` argument is an object containing the configuration of the class. Options available are:<br>- `trackOnGoogleAnalytics` (Boolean): Indicates if the task need to be tracked on Google Analytics<br>- `trackOnIntercom` (Boolean): Indicates if the task need to be tracked on Intercom
`createTask(name)` | Creates and returns a `HuhaTask` class with the given `name`

### Example ###

```javascript
import Huha from '@ebury/huha';

let huha = new Huha();
let huhaTask = huha.createTask('TaskName');
```

## Our story ##

We thought we had to honour the great Chimo Bayo, 
we’ve programmed this while listenting all his hits 
“asi me gusta” and the must-listen “techno valencia”, 
then we thought what if a user interacts with our app 
while listenting Chimo Bayo? Bang! There you have your
Hyperactive User and here we have our Hint Analytics. 
It makes totally sense for us.


