
# The Lawshram Project

## Guide to run the app

If already set up jump to step 5, else start with step 1 for first time build.

1. Install Node.js
2. Clone the app
3. Running app in dev environment
4. Install Nginx in production environment
5. Configure nginx in production environment
6. Run the app

### 1. Install Node.js:

##### Mac/Linux

Install nvm (Node Version Manager) using

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
```
or <br/>
```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
```

Then restart the terminal and type
```sh
nvm install 6
```

This will install Node v6

### 2. Clone the repo
```sh
git clone https://kowsikgk@bitbucket.org/lawshram/tlp-fe.git
```
or <br />
```sh
git clone https://kowsikgk@bitbucket.org/lawshram/tlp-fe.git

```

### 3. Running app in dev environment
<br/>
In dev environment just run

```sh
npm run dev
```

<br/>
inside the project directory as the webpack server frontend is configured to run in 8080

<br/>
just go to http://localhost:8080/ to view the application in the browser

http://localhost:8080/

### 4. Install nginx in production

##### 	Linux:
```sh
apt-get install nginx
```

##### 	Mac:
```sh
brew install nginx
```
### 4. Configure nginx for production environment
```sh
cd path-to-nginx
```
Mac Nginx path: `/usr/local/etc/nginx/` <br/>
Linux Nginx path: `/etc/nginx` <br/>

`cd` into `sites-enabled` directory. If it doesn't exist, create it.

```sh
cd sites-enabled
```
Create a new file called lawshram
```sh
sudo touch lawshram
```
And paste the following contents into it:
```sh
server {
    listen 8080;
    root "<path-to-lawshram-directory>/__build__";
    index "index.html";

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /v1 {
    	proxy_pass http://35.196.152.226:9098/v1;
    }
}
```
Replace `<path-to-lawshram-directory>` with the path to the dir where you've cloned the repo <br/>
E.g. `"/home/username/Documents/Github/lawshram"`

**Note:** `"http://192.168.39.43:8090/rest/"`: this is the REST URL. It might different in different environments.

#### 5. Build
Start nginx if not already started.
```
sudo nginx
```
`cd` into the cloned repo dir
```
cd path-to-cloned-repo
```
Pull if you want to get latest changes
```
git pull
```
Then build the app
```
npm i
npm run clean
npm run build
```
Then go to `http://localhost:8080` to use the app. Port number is what you have defined in nginx configuration: `listen <some-port-no>`.

