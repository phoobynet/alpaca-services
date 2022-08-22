# Market Data Real-time Websocket OAuth support

I'm just updating my Alpaca API to support OAuth. However, I've noticed that there is no documentation for authenticating using OAuth access tokens for market data real-time websockets.

I can receive trade updates from the Trade API streaming socket data with OAuth, and I can access historical data ReST API using the `Authorization: Bearer` header, but not for Market Data real-time websockets.

I've taken a look at the [alpaca-py](https://github.com/alpacahq/alpaca-py/blob/f60234244c192553a19ceee0d5814ff65486d8d8/alpaca/common/websocket.py#L17) source code to try and figure out how to do it, but it doesn't appear to implemented.

Am I missing something?

I did try the same format for sending a auth socket message as described for trade streaming authentication, but it didn't work.

If it is the case that there is no Market Data Real-Time Websockets support for authenticating with OAuth, that seems like a glaring omission.

If I have missed something, please correct me.

Thanks

G
