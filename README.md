# On/Off

An on/off switch for web applications.

## Setup

```bash
npm install
```

## Starting

```bash
foreman start
```

## Environment Variables

* `USERNAME`
* `PASSWORD`
* `APP`
* `URL`
* `S3_URL`
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

## Deploying to Heroku

```bash
heroku apps:create <whatever>
heroku config:set USERNAME=user \
                  PASSWORD=password \
                  S3_BUCKET=onoff.example.com \
                  APP=billing \
                  AWS_ACCESS_KEY_ID=<AWS access key> \
                  AWS_SECRET_ACCESS_KEY=<AWS access key secret>
git push heroku master
```
