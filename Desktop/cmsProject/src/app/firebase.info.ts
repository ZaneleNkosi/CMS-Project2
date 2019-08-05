export const FIREBASE_INFO = {
    apiKey: "AIzaSyCNkOqo3GECKFGbhq3oLTmlc163vRyC-20",
    authDomain: "hotelapp-b6b6e.firebaseapp.com",
    databaseURL: "https://hotelapp-b6b6e.firebaseio.com",
    projectId: "hotelapp-b6b6e",
    storageBucket: "hotelapp-b6b6e.appspot.com",
    messagingSenderId: "617518464883",
    appId: "1:617518464883:web:2248661b3e234446"
};

export const snapshotToArray = snapshot =>{
    let returnArray = [];
snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
});
    return returnArray;
}