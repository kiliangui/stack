# Stack

This is my stack. The starting point of my side projects.
In this Nextjs Project, you will find the complete schemes for authentification, Oauth, and data handling.

## WHY ?

Developing a side project is very time-consuming and I find out that the majority of the time I passed creating websites was always with the users and data management. 
I needed to create a template with data management all configured with all password lost, email confirmation, and account deletion thing... So when I want to create a side project, all is working and I can focus on creating the actual idea, and not rewriting the same things again

## The Tech Stack

### NextJs
For my side projects, I use Nextjs as a base. Nextjs allow you to handle ClientSide and serverSide generation of the page. This is a very flexible framework and I found it very cool to work with.

### PocketBase
For all the data on the website, I use PocketBase. This is a Database that fits into your pockets. It is very light and is based on SQLite. Pocketbase can scale vertically, but it doesn't scale horizontally. The lack of horizontal scale is not a problem for me, since I don't want to create the next Tiktok but just some cool side-projects.

PocketBase implements login with email/pass Oauth and more and handles all the authorization with the database. We can simply store files in the database. We can pass files with the creation of a row with the SDK, and Pocketbase handles the storage of the files and return just the URLs to download the files.

### PicoCss / Tailwind
To quickly start working on an MVP, I like starting working on the logic and then designing my website. PicoCss allows me to have a better look without having to pass an eternity on Css

When I want to quickly prototype a layout, I use TailwindCss. The stylesheet is automatically linked to the html and generated on the fly, so it's pretty light.

when my MVP is functional, I use regular CSS to style properly all the elements with the design system of the project.

## Installation
To install the project first clone the repository

```bash
git clone https://github.com/ichunichu/stack.git
```

Then go into the repository

```bash
cd stack
```

After that, you can install the project with 

```bash
npm install
```

You can then go to ["PocketBase.io"]("https://pocketbase.io/") to download the executable. You need to place it into the project's root.

## Starting the project
To start the project you need to start the database with :

```bash
./pocketbase_s serve
```

then you can start the development web server with : 

```bash
npm run dev
```
