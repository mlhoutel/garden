---
title: "Webrtc"
short: ""
---

## Intro 

**Web Real Time Communication**

https://webrtc.org/

Open source standard to enable realtime and [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) communication for audio, video or binary data in Web and native apps. 

It was released in 2011, and is now a [W3C recommandation](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium#W3C_recommendation_(REC)) (since january 2021)

## Js Libraries
Wrappers:
- https://github.com/webrtcHacks/adapter
- https://github.com/peers/peerjs

Native expose api exemples
- https://github.com/muaz-khan/WebRTC-Experiment
- 
## How does it work ?

### [Peer connection](https://webrtc.org/getting-started/peer-connections)

#### 1. Signaling

If the two clients are in the same local network, they can connect directly via their adress. Otherwise, they will need to perform [NAT traversal](https://en.wikipedia.org/wiki/NAT_traversal).

> See the [Mozilla documentation for protocols](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols) (ICE, STUN, NAT, TURN...)
> 
> **STUN (Session Traversal Utilities for NAT)**
> Permit to discover your public address and determine any restrictions in your router that would prevent a direct connection with a peer.
> 
> **TURN (Traversal Using Relays around NAT)**: 
>  Some routers using NAT employ a restriction called 'Symmetric NAT' (router will only accept connections from peers you've previously connected to).

**1.1. Each clients gives an [ICE Server configuration](
https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment) ([STUN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT) / [TURN](https://fr.wikipedia.org/wiki/Simple_Traversal_of_UDP_through_NATs))**

 * Instanciation of a connection handler with [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)

**1.2. They provide [ICE candidates](https://datatracker.ietf.org/doc/html/rfc6544) to each client.**

 * Creation of an [SDP](https://en.wikipedia.org/wiki/Session_Description_Protocol) (offer or answer) with [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription) 

**3.3. Candidates are then transferred to the remote peer.**

* HTTP-based Web API (REST, WebSocket...)

![screenshot](https://codimd.web.cern.ch/uploads/upload_24a194a89dc4afa998d1f4acace3adbf.png)

[source article: a protocol for implementing video conferencing](https://eytanmanor.medium.com/an-architectural-overview-for-web-rtc-a-protocol-for-implementing-video-conferencing-e2a914628d0e)

#### 2. Datas transmission

- [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) acquires the audio and video media (device camera and microphone).

- [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) enables audio and video communication between peers. It performs signal processing, codec handling ([VP8/VP9](https://en.wikipedia.org/wiki/VP8)), peer-to-peer communication, security (Audio/Video encrypted with [SRTP](
https://fr.wikipedia.org/wiki/Secure_Real-time_Transport_Protocol)), and bandwidth management.

- [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) allows bidirectional communication of arbitrary data between peers. The data is transported using [SCTP](https://en.wikipedia.org/wiki/Stream_Control_Transmission_Protocol) over [DTLS](https://en.wikipedia.org/wiki/Datagram_Transport_Layer_Security).

- It uses the same API as [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and has very low latency.

```
PING eu-0.turn.peerjs.com (159.69.125.43) 56(84) bytes of data.
64 bytes from static.43.125.69.159.clients.your-server.de (159.69.125.43): icmp_seq=1 ttl=47 time=19.7 ms
```

![screenshot](https://codimd.web.cern.ch/uploads/upload_034c8dce297c88129531c2ea0ce8614b.png)

![screenshot](https://codimd.web.cern.ch/uploads/upload_14eae92259b717cc394b559776bc0124.png)

https://blog.logrocket.com/webrtc-signaling-websocket-node-js/

RTP / RTPC https://en.wikipedia.org/wiki/Real-time_Transport_Protocol