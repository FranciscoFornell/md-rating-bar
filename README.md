#mdRatingBar
mdRatingBar is an Angular rating bar directive for use with [Angular Material](https://material.angularjs.org).

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
bower install md-rating-bar --save
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

The basic usage is:
```html
<md-rating-bar ng-model="value"></md-rating-bar>
```
By default it uses an svg star with material design style and a yellow fill color, but you can add the following optional attributes for more funcionality:

| Attribute              | Value           | Description                                                                                                                 |
|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------|
| rb-max                 | Number          | It sets the maximum value. Default is 5.                                                                                    |
| rb-bg-color            | Color code      | It sets the background color. Default is #DDDDDD.                                                                           |
| rb-fill-color          | Color code      | It sets the fill color. Default is #FFDD00.                                                                                 |
| rb-character-icon      | UTF-8 character | It sets the UTF-8 symbol used as icon. Default is ★.                                                                        |
| rb-md-svg-icon         | Icon name       | It sets an SVG icon as visual element. It requires $mdIconProvider to be configured with inline icon sets.                  |
| rb-md-svg-src          | URL             | It sets an SVG icon as visual element from an SVG file URL.                                                                 |
| rbMdFontIcon           | Options object with a fontSet property and a iconName property        | It sets an icon from an icons font set as visual element                                                    |
| rb-use-md-theme-colors |                 | Makes the rating bar colors to match the current Angular Material theme (which can be configured using $mdThemingProvider). |
| rb-readonly            |                 | Makes the rating bar to be read-only.                                                                                       |
| rb-on-update           | callback        | It sets the action to be taken when the value of the rating bar changes.                                                    |

There are different examples of usage in the [demo page](http://franciscofornell.github.io/md-rating-bar/).

## Testing

Jasmine tests have been included in the tests folder. You can use any server to serve the files and test it, but probably the easiest way is to use python:

In the project's folder run:
```
python -m SimpleHTTPServer
```
and when you see the message:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```
you can open a web browser and write localhost:8000/tests in the adress bar.
