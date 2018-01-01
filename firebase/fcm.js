const admin = require("firebase-admin");

const registrationToken = "cBdESxuPXL0:APA91bGFQGxBWRQ6baBhr0_eSSFu39URG0h-uXQBwBIrh5wfvQMcQ7waE4FKOXjJ-vnUJyjxCYO6kH3SwmdDRDC5xFz90_GNEVUw2iMiUlenuzJfagwMrcbDhUxzgLsanoWjQdfE-skQ";


function sendToTestDevice() {
  let payload = {
    data: {
      action: "ringing",
      value: "true"
    }
  };

  return new Promise((resolve, reject) => {
    admin.messaging().sendToDevice(registrationToken, payload)
      .then(function (response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
        resolve(response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
        reject();
      });
  });
}

function sendToDevice(registrationToken, action) {
  let payload = {
    data: {
      action: action,
      value: "true"
    }
  };

  return new Promise((resolve, reject) => {
    admin.messaging().sendToDevice(registrationToken, payload)
      .then(function (response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
        resolve(response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
        reject();
      });
  });
}

module.exports.sendToTestDevice = sendToTestDevice;
module.exports.sendToDevice = sendToDevice;