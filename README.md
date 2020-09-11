# Reddit Clone

## Development

#### SERVER

1. Have PostgreSQL running.
2. Have Redis running: `redis server`
3. Run `yarn watch` in one terminal window.
4. Run `yarn dev` in another window.

## Notes

#### Session Authentication

req.session.userId = user.id;

1. `{userId: 1}` -> send to redis and stored like this: `fja;oeijfalsdkjfaoiewf: {userId: 1};`

2. express-session then sets cookie in browser with value `fja;oeijfalsdkjfaoiewf`

3. when user makes a request, `fja;oeijfalsdkjfaoiewf` will be sent to server

4. decrypt the cookie into the `user.id`
