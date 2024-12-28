# Server Sent Events
[Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) is a one way protocol for pushing data from the server to the client. Similar to WebSockets, it allows for real-time updates to be sent to the client and has ubiquitious support in all major browsers. However, unlike WebSockets, the client cannot push data to the server.

This repository aims to provide an example implemented in javascript server and client side.

### Fields of server event
```
    field: A string identifying the type of event described
    data: payload
    id: Sets eventSource last event ID
    retry: time to retry establishing connection to server
```