# DISC

> This is an old project, and **NOT ACTIVELY MAINTAINED**. It requires jumping through a few hoops to get it running correctly, I will try to outline the steps here to ease the pain.
> <br> I intend update the dependencies, remove the database and roll out a "newer" version at some point in the future, but today is not that day.


This is an application designed to perform [DISC](https://en.wikipedia.org/wiki/DISC_assessment) (**D**ominance, **I**nducement, **S**ubmission, **C**ompliance) assessment _(some [versions](https://www.discprofile.com/what-is-disc) use **D**ominance, **I**nfluence, **S**teadiness and **C**onscientiousness instead)_.

It will let you complete a DISC assessment and generate a profile graph _(currently, only the combined graph is generated)_. It consists of a series of 28 pages, with two choices _(most like you and least like you)_ to be chosen from every page.

It also contains some basic features like a database to store user results, with a signup and login flow. All of this is setup in a very rudimentary fashion and easy to work around, if desired. The database itself is unprotected.

## Setup and running the application

> This application requires `mongodb v3.2.x` and `node v6.x` to run. It is possible that newer versions of node and mongodb would work, but it has not been tested.

To run the project locally, first clone this repository and follow the steps below

### MongoDB

1. Download `mongodb v3.2.0` from the archives link [here](https://www.mongodb.com/try/download/community-edition/releases/archive) _(search for 3.2.0 and select the appropriate package for your system)_
2. Extract the archive and move the folder to the root directory of the `disc` project that was cloned
3. Open a shell in the root of the project and run `<mongodb_folder_name>/bin/mongod --dbpath ./data`
4. Make sure it's running on port `27017`, or change that in [app.js](./app.js) and restart the database

### Node

1. Install and enable `node v6.x` _(I highly recommend using a version manager like [nvm](https://github.com/nvm-sh/nvm) to make your life easier. After you install `nvm`, just run `nvm install 6` from the root directory and you're good to go)_
2. Install the dependencies by running `npm install`


Run `npm start` to start the application, and navigate to [localhost](http://localhost)

## Usage

Run the application, create an account, login, and complete the questionnaire. Then click on the Results button to see the profile graph.

## Contact

For any bugs, questions or suggestions, please feel free to create an [issue](https://github.com/lloydaf/disc/issues)