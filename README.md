# HUHA

This repository contains the source code for HUHA (Hyperactive Users Hint Analysis).

HUHA is a JavaScript library that helps measure the usability and user experience of a project in an automated way.

1. [Vision](VISION.md)
1. [Code Owners](CODEOWNERS)
1. [Contributing](CONTRIBUTING.md)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Prerequisites](#prerequisites)
1. [References](#references)

## Installation

If you want to contribute to the library then you will have to clone the repository and install all dependencies:

```sh
git clone https://github.com/Ebury/huha.git
cd huha
npm install
```

## Usage

If you want to use the library in your project then you will have to install it (via [npm](https://www.npmjs.com/package/@ebury/huha)) as a dependency:

```sh
npm install @ebury/huha --save
```

And then you can import the `Huha` class in your application:

```javascript
import Huha from '@ebury/huha'
```

### API Reference

You can visit [Reference](REFERENCE.md) to check the reference.

## Prerequisites

For the correct registration of the information in the tracking tools it is required that the set-up scripts of those tools to be used have been executed, which will define the necessary global variables. For instance, if the option `trackOnSegment` is set to `true`, HUHA expects to find the Segment corresponding global variable,  [analytics](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/), filled in.

## References

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Jest](https://jestjs.io/)

[npm](https://www.npmjs.com/)

[Google Analytics](https://analytics.google.com/analytics/web/)

[Intercom](https://www.intercom.com/)

[Segment](https://segment.com/)
