// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/8.4.1/firebase-app.js');
// importScripts('/__/firebase/8.4.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');
const firebaseConfig = {
  apiKey: 'AIzaSyAbOHPhvJ9W17hCS-q0u_nB3dWayYxNI64',
  authDomain: 'aulac-c6ce1.firebaseapp.com',
  databaseURL: 'https://aulac-c6ce1-default-rtdb.firebaseio.com',
  projectId: 'aulac-c6ce1',
  storageBucket: 'aulac-c6ce1.appspot.com',
  messagingSenderId: '599120860760',
  appId: '1:599120860760:web:d13ec6886a3c6029835c2d',
  measurementId: 'G-GR7832SSKV',
};
firebase.initializeApp(firebaseConfig);
// if (firebase.messaging.isSupported()) {
//   alert('Trình duyệt bạn không hỗ trợ, xin hãy thử lại bằng Chrome');
// }
const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');
const messaging = firebase.messaging();
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'api-key',
   authDomain: 'project-id.firebaseapp.com',
   databaseURL: 'https://project-id.firebaseio.com',
   projectId: 'project-id',
   storageBucket: 'project-id.appspot.com',
   messagingSenderId: 'sender-id',
   appId: 'app-id',
   measurementId: 'G-measurement-id',
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 **/

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  console.log(payload.notification);
  console.log(payload)
  const data = payload.data;
  const notification = JSON.parse(data.notification);
  console.log(data, notification)
  // const { notification, data } = payload;
  const notificationOptions = {
    body: notification.body,
    data,
    // icon: '/firebase-logo.png',
  };

  self.registration.showNotification(
    `${notification.title}`,
    notificationOptions
  );
});
self.addEventListener('notificationclick', function (event) {
  // console.log(event.notification);
  // console.log('On notification: ', event.notification.data);
  // event.notification.close();

  const data = event.notification.data;

  // console.log('OK======');

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        // console.log('============ In Then watiUntil 4444==========');
        // console.log(data);
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          // const clientUrl = new URL(client.url);
          // console.log('============ Parsing 2 host ==========');
          // console.log(clientUrl.host, urlToOpen.host);
          // // Check host matches
          // if (clientUrl.host === targetUrl.host && 'focus' in client) {
          //   // Update URL
          //   console.log('============ found same host ==========');
          //   client.navigate(urlToOpen);

          //   // Focus existing window
          //   client.focus();

          //   // Avoid opening a new window
          //   noMatch = true;
          // }
          // if (client.url == '/' && 'focus' in client) return client.focus();
          if (client.url == '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) {
          // console.log('========== In If ==========');
          // const url = `/?name=${data.name}`;
          if (data.type === 'ORDER_ACCEPTED') {
            console.log('in if order accepted');
            return clients.openWindow(`/order/${data.orderID}`);
          } else if (data.type === 'NEW_PROMOTION') {
            console.log('in if new promotion');
            return clients.openWindow(`/profile?tab=coupons`);
          }
        }
      })
  );
});
// messaging.onMessage(function (payload) {
//   console.log('Ok we got notification when our app is openning, but in sw file');
//   console.log(payload);
//   const { notification } = payload;
//   const { title, body, image: icon } = notification;
//   const notificationOptions = {
//     body,
//     icon
//   }
//   self.registration.showNotification(title, notificationOptions)
// });
