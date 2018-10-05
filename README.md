# IoT applyed to transportation

## Description

It's a real-time project that get the location of a transportation vehicle of people
We will show in real time the location in an web page with an embedded google maps  with a custom pin of a determined vehicle.

## Prerequisites

You have to install in your computer:

* [Git (Optional)](https://git-scm.com/downloads)
* [docker-compose](https://docs.docker.com/v17.09/compose/install/)

## Installation

1. Clone the repo with the command or download the project
    * Clone: "https://github.com/dibene/TallerDeProyecto2.git"
3. Open a terminal in the root directory
    * Build and run the containers
        * ```docker-compose up -d```
        * That's all to start the database server, phpmyadmin and the python server. You can check it through the command ```docker ps``` and you could see the containers up. Also, you can enter in http://localhost:8080 and you have to see the welcome page of phpmyadmin.
    * Check the project in http://localhost:8888
