![Build Status](https://codeship.com/projects/e058a580-4d34-0135-028e-2a4961856651/status?branch=master)
![Code Climate](https://codeclimate.com/github/oscar6654/cupid-compass.png)
![Coverage Status](https://coveralls.io/repos/oscar6654/cupid-compass/badge.png)
<p align="center">
<img src="https://github.com/oscar6654/cupid-compass/blob/oscar6654-update-readme/app/assets/images/logo_small.png">
</p>
<p align="center">
<b>The Love Sherpa | Your guide to romance | Because finding love it hard enough | The authority on all things dating | Making dating just a little easier</b>
</p>

## Installation

```
rake webpacker:install && rake webpacker:install:react

yarn install

bundle

rake db:create

rake db:migrate

yarn start

rails s
```

## About this Application:

Users are invited to explore the world of dating hot spots with Cupids Compass. Search based on restaurant/park/location, city or state and add your favorite romantic locale if it doesn't exist. Can't decide on a place? See reviews of other daters to help narrow down your decision. If your go-to spot doesn't exist, simply add it! Finally, if you're feeling extra adventurous, use the Magic Date Ball (tm) to find the randomized date spot of your wildest dreams!

## Development:

Cupid's Compass was created using primarily [React JS](https://facebook.github.io/react/) (React 15.6.1) on the front-end and [Rails](http://rubyonrails.org/) (Rails 5.1.2) on the back-end. Additional styling was implemented using [Materialize](http://materializecss.com/). User authentication and tangential features are implemented using Devise. Uploading user profile photo uses CarrierWave gem.

The testing suite consists of Enzyme testing for React, RSpec for model testing, and Capybara for feature testing.

## ToDo

Categories:

* Each date spot will belong to several categories allowing users to have an easier time to find new dating locations.

* Each date spot will be integrated with the Google Maps API to allow users to easily find their location.

* The Magic Date Ball will know the users location and allow for more targeted random locations

* Each review will have an average review and be rankable
