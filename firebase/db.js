const firebasedatabase = require('./firebaseadmin').database();
const productinstance = require('../models/productinstance');


const PRODUCTINSTANCES_REF = "product_instances";


function getProductInstanceRef() {
  return firebasedatabase.ref(PRODUCTINSTANCES_REF);
}

module.exports = {
  createProductInstance: (uid, name, instance) => {
    return new Promise( (resolve, reject) => {
      console.log("db.js/createProductInstance", "instance=", instance);
      getProductInstanceRef().child(uid)
        .orderByChild(productinstance.UUID_REF).equalTo(instance[productinstance.UUID_REF])
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("db.js/createProductInstance", "snapshot.exists() is True");
            console.log("db.js/createProductInstance", "snapshot.val()=", snapshot.val());
            snapshot.forEach((childSnapshot) => {
              let existingKey = childSnapshot.key;
              console.log("db.js/createProductInstance", "snapshot.forEach", "childSnapshot.key=", existingKey);
              getProductInstanceRef().child(uid).child(existingKey).child(productinstance.TOKEN_REF).set(instance[productinstance.TOKEN_REF]);
              resolve();
            });
          } else {
            console.log("db.js/createProductInstance", "snapshot.exists() is False");
            getProductInstanceRef().child(uid).push(instance);
            resolve();
          }
        });
    });
  },

  findProductInstance: (uid, instanceId) => {
    return new Promise((resolve, reject) => {
      console.log("db.js/findProductInstance", "uid=", uid, "instanceId=", instanceId);
      getProductInstanceRef().child(uid).child(instanceId).once("value", (snapshot) => {
        console.log("db.js/findProductInstance", "snapshot=", snapshot);
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("Doesn't exists"));
        }
      });
    });
  },
};
