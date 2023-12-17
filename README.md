# Sprint 8 project
# Author: Michael Tawfik
# Used WebDriverIO locally to run automated tests on the Urban.Routes application: This was done to ensure a user can complete an order for a taxi with specific specifications. Automation of this process will ensure that valuable time is not wasted when updates are made and regression testing is required
# Technolgies used were: WebDriverIO, VS Code, Git Bash, GitHub, Node JS, Mocha
# The tests are run through the latest version of the FireFox browser
# Make sure to install WebdriverIO using the 'npx wdio config' command in the terminal after cloning the repo to your local computer with the command 'git clone git@github.com:username/hm08-qa-us.git'
# Before running tests the user will have to start the server and input the server URL into the wdio.conf.js file ( line 23 "baseUrl")
# To run tests use the 'npm run wdio' command in the terminal 
# Tests are separated by their unique "it" statements so the user will know where a test fails and comments are made throughout the tests to help further understand what is being done for each step of each test
# functions used were "const" and "await"
# constants were written in camelCase and can be found in the page.js file. Comments are made throughout the page.js file to show the different CSS selectors needed for testing
# 'await' is used to wait for elements to appear or become clickable 
# 'await expect' is used in some instances to confirm the required selection has been made
