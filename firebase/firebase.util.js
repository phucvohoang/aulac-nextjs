import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
import { checkAuth, getRoomName } from '../util/helper';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
// alert('Fuck');
export let messaging = null;
export const isiOS = () => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};
// only run check on browser
if (typeof window !== 'undefined') {
  if (!firebase.messaging.isSupported()) {
    if (isiOS) {
      // alert('Bạn đang sử dụng Mobile of Apple');
    } else {
      // alert('Trình duyệt bạn không hỗ trợ, xin hãy thử lại bằng Chrome');
    }
  } else {
    messaging = firebase.messaging();
  }
}
// if (firebase.messaging.isSupported()) {
//   alert('Trình duyệt bạn không hỗ trợ, xin hãy thử lại bằng Chrome');
// }
// firebase.sub
// const messaging = firebase.messaging();

// const functions = firebase.functions();
// export const requestFirebaseNotificationPermission = () =>
//   new Promise((resolve, reject) => {
//     messaging
//       .requestPermission()
//       .then(() => messaging.getToken({vapidKey: "BM2PJVvurqcwC0bQLRshtPnEH9aoLan6WBmrZ1xF1K9Pgpe7faBgJZcJCa_MXIpiyymZAiMJij8B5nP9DtsY23w"}))
//       .then((firebaseToken) => {
//         resolve(firebaseToken);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       //console.log('got message from server')
//       resolve(payload);
//     });
//   });
// export const firestore = firebase.firestore();

// firebase.initializeApp(firebaseConfig);
export const publicKeyMessaging =
  'BM2PJVvurqcwC0bQLRshtPnEH9aoLan6WBmrZ1xF1K9Pgpe7faBgJZcJCa_MXIpiyymZAiMJij8B5nP9DtsY23w';

export const baseURL = 'https://us-central1-aulac-c6ce1.cloudfunctions.net/api';
// export const baseURL = 'http://localhost:5001/aulac-c6ce1/us-central1/api';

// //console.log(
//   `============ Firebase API URL : ${publicKeyMessaging}, ${baseURL}`
// );

export const firestore = firebase.firestore();
// export messaging;
const subscribeToken = (deviceToken = '', userProfile = null) => {
  // const deviceToken = localStorage.getItem('deviceToken');
  if (!deviceToken || !userProfile) {
    //console.log(deviceToken);
    //console.log(userProfile);
    //console.log('============= Did not get device Token');
    return;
  }
  let { _id: userId } = userProfile;
  //console.log(userProfile);
  // const baseURL = process.env.REACT_APP_FIREBASE_API;
  //console.log(baseURL);
  fetch(`${baseURL}/subscribe-token`, {
    method: 'POST',
    body: JSON.stringify({
      deviceToken: deviceToken,
      uid: userId,
      role: 'customer',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(
      //   '================ Subscribe token as User successfully ================'
      // );
      //console.log(data);
    })
    .catch((e) => {
      //console.log(
      //   '================ Subscribe token as User failure ================'
      // );
      //console.log(e);
    });
};

export const setSeenState = (roomId, uid, typeChat = 'customer-customer') => {
  return fetch(`${baseURL}/set-seen`, {
    method: 'POST',
    body: JSON.stringify({
      roomId,
      uid,
      typeChat,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
    })
    .catch((e) => {
      // console.log(e);
    });
};
const renderNotification = (payload) => {
  const data = payload.data;
  // console.log(data);
  const notification = JSON.parse(data.notification);
  console.log('===== Data in render notification ======');
  console.log(payload);
  const { title, body } = notification;
  const notificationOptions = {
    body,
    // icon,
    data,
  };
  if ('Notification' in window) {
    Notification.requestPermission()
      .then((result) => {
        if (result === 'granted') {
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
              .then((swReg) => {
                swReg.showNotification(title, notificationOptions);
              })
              .catch((e) => {
                //console.log('something went wrong, our sw is not ready');
              });
          }
        }
      })
      .catch((e) => {
        //console.log('permission has denied');
      });
  }
};
export const registerToken = () => {
  if (messaging) {
    messaging
      .getToken({ vapidKey: publicKeyMessaging })
      .then((currentToken) => {
        if (currentToken) {
          localStorage.setItem('deviceToken', currentToken);
        } else {
        }
      })
      .catch((err) => {});
  }
};
export const registerTokenAndSubscribe = (userProfile) => {
  if (messaging) {
    messaging
      .getToken({ vapidKey: publicKeyMessaging })
      .then((currentToken) => {
        if (currentToken) {
          subscribeToken(currentToken, userProfile);
          localStorage.setItem('deviceToken', currentToken);
        } else {
        }
      })
      .catch((err) => {});
    messaging.onMessage(function (payload) {
      // console.log(payload);
      renderNotification(payload);
    });
  }
};
export const isUserExistOnSystem = async (uid) => {
  const existingUser = await firestore
    .collection('Customers')
    .where('uid', '==', uid)
    .get();
  if (existingUser.size > 0) {
    let idOnFirebase;
    existingUser.forEach((doc) => {
      idOnFirebase = doc.id;
    });
    return idOnFirebase;
  }
  return false;
};
export const createMessageOnFirebase = async (payload) => {
  try {
    //console.log('Here is our payload');
    //console.log(payload);
    if (payload && payload?.from?.uid) {
      //console.log('inside if');
      const { from } = payload;
      await firestore
        .collection(`/Messages/customer-admin/${from.uid}`)
        .add(payload);

      //console.log(
      //   `Create message success at /Messages/customer-admin/${from.uid}`
      // );
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
export const createUserOnFirebase = async (payload) => {
  try {
    if (payload) {
      await firestore.collection('Customers').add(payload);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
export const createNewOrderOnFirebase = async (payload) => {
  try {
    //console.log('Here is our payload for new order');
    //console.log(payload);
    if (payload) {
      //console.log('inside if');
      await firestore.collection('/Notifications/orders/list').add(payload);

      //console.log(`Create order success at`);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const setSeenToFalse = async (idOnFirebase) => {
  try {
    await firestore.collection('Customers').doc(idOnFirebase).update({
      seen: false,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const sendMessageToSpecifyUser = async (payload, pathFirestore) => {
  try {
    await firestore.collection(`${pathFirestore}`).add(payload);
    return true;
  } catch (e) {
    return false;
  }
};
export const sendMessageToGroup = async (payload, groupName) => {
  try {
    await firestore
      .collection(`/Messages/group/conversations/${groupName}/messages`)
      .add(payload);
    return true;
  } catch (e) {
    return false;
  }
};

export const checkOrCreateRoomUserDriver = async (userA, userB) => {
  try {
    //console.log(userA);
    //console.log(userB);
    const querySnapshot = await firestore
      .collection(`/Messages/customer-driver/rooms`)
      .where(`${userA.uid}.email`, '==', userA.email)
      .where(`${userB.uid}.email`, '==', userB.email)
      .get();

    if (querySnapshot.size === 0) {
      const roomName = getRoomName(userA.uid, userB.uid);
      try {
        await firestore.collection(`/Messages/customer-driver/rooms`).add({
          [`${userA.uid}`]: userA,
          [`${userB.uid}`]: userB,
          roomName,
        });
        return true;
      } catch (e) {
        //console.log(e);
        return false;
      }
    }
    //console.log('Room us already exist');
    return true;
  } catch (e) {
    return false;
  }
};
export const checkOrCreateRoomDriverUser = async (customer, driver) => {
  try {
    //console.log(customer);
    //console.log(driver);
    // checking whether or not exist
    const querySnapshot = await firestore
      .collection(`/Messages/customer-driver/rooms`)
      .where(`customerId`, '==', customer.uid)
      .where(`driverId`, '==', driver.uid)
      .get();

    if (querySnapshot.size === 0) {
      const roomName = getRoomName(customer.uid, driver.uid);
      try {
        await firestore.collection(`/Messages/customer-driver/rooms`).add({
          customer: customer,
          driver: driver,
          customerId: customer.uid,
          driverId: driver.uid,
          roomName,
        });
        return true;
      } catch (e) {
        //console.log(e);
        return false;
      }
    }
    //console.log('Room us already exist');
    return true;
  } catch (e) {
    return false;
  }
};
export const checkOrCreateRoomUser = async (userA, userB) => {
  try {
    //console.log(userA);
    //console.log(userB);
    const querySnapshot = await firestore
      .collection(`/Messages/customer-customer/rooms`)
      .where(`${userA.uid}.email`, '==', userA.email)
      .where(`${userB.uid}.email`, '==', userB.email)
      .get();

    if (querySnapshot.size === 0) {
      const roomName = getRoomName(userA.uid, userB.uid);
      try {
        await firestore.collection(`/Messages/customer-customer/rooms`).add({
          [`${userA.uid}`]: userA,
          [`${userB.uid}`]: userB,
          roomName,
        });
        return true;
      } catch (e) {
        //console.log(e);
        return false;
      }
    }
    //console.log('Room us already exist');
    return true;
  } catch (e) {
    return false;
  }
};

export const createNewGroupChat = async (payload) => {
  try {
    await firestore.collection(`/Messages/group/manages`).add(payload);
    return true;
  } catch (e) {
    //console.log('========== Could not create Group Chat =============');
    //console.log(e);
    return false;
  }
};

export const getDeviceToken = async (uid) => {
  try {
    const userRef = await firestore
      .doc(`/Device-Token/Direct/employees/${uid}`)
      .get();
    const { deviceToken } = userRef.data();
    return deviceToken ? deviceToken : false;
  } catch (e) {
    //console.log(e);
    return false;
  }
};

export const getGroupChat = async (groupName) => {
  try {
    const querySnap = await firestore
      .collection(`/Messages/group/manages`)
      .where('groupName', '==', groupName)
      .get();
    if (querySnap.size > 0) {
      let res = [];
      querySnap.forEach((doc) => {
        res.push({ groupInfo: doc.data(), groupId: doc.id });
      });
      //console.log(res);
      return res;
    }
    return false;
  } catch (e) {
    return false;
  }
};
export const updateGroup = async (groupId, payload) => {
  try {
    await firestore.doc(`/Messages/group/manages/${groupId}`).update(payload);
    return true;
  } catch (e) {
    return false;
  }
};

// Hanlde Seen state

export const getSeenState = async (collectionId, docid) => {
  try {
    console.log(`/Messages/customer-admin/${collectionId}/${docid}`);
    const doc = await firestore
      .doc(`/Messages/customer-admin/${collectionId}/${docid}`)
      .get();
    if (doc) {
      const { _id } = checkAuth()?.currentUser || {};
      console.log(doc.data());
      const { seen, from } = doc.data();
      console.log(from);
      return seen && from.uid === _id; // Make sure seen is true and this message is current user's message
    } else {
      console.log('Could not get message');
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setSeenMsg = async (collectionId, docid) => {
  try {
    console.log(`/Messages/customer-admin/${collectionId}/${docid}`);
    await firestore
      .doc(`/Messages/customer-admin/${collectionId}/${docid}`)
      .update({ seen: true });
    console.log('Set Seen success');
  } catch (e) {
    console.log(e);
    return false;
  }
};
