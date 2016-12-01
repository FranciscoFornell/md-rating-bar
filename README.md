#mdRatingBar
mdRatingBar is an Angular rating bar directive for use with Angular Material.

* [License](#license)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)

## License

This software is provided free of charge and without restriction under the [MIT License](LICENSE.md)

## Demo

A live [demo](http://franciscofornell.github.io/md-rating-bar/).

## Installation

#### Using Bower

This package is installable through the Bower package manager.

```
bower install mr-rating-bar --save
```

In your `index.html` file, include the rating bar module and style sheet.

```html
<!-- style sheet -->
<link href="bower_components/md-rating-bar/dist/mdRatingBar.min.css" rel="stylesheet" type="text/css"/>
<!-- module -->
<script type="text/javascript" src="bower_components/md-rating-bar/dist/mdRatingBar.min.js"></script>
```

Include the `mdRatingBar` module as a dependency in your application.

```javascript
angular.module('myApp', ['ngMaterial', 'mdRatingBar']);
```

## Usage

There are different examples of usage in the [demo page](http://franciscofornell.github.io/md-rating-bar/).