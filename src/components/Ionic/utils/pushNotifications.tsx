import React, { useEffect } from "react";
import { PushNotifications, Token } from "@capacitor/push-notifications";

const PushNotificationsContainer = () => {
  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            // showToast("Push Notification permission denied");
            console.log("Push Notification permission denied");
          } else {
            // showToast("Push Notification permission granted");
            console.log("Push Notification permission granted");
            register();
          }
        });
      } else {
        register();
      }
    });
  }, []);

  const register = () => {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token: Token) => {
      console.log("Push registration success");
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      console.log("Error on registration: " + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device

    // PushNotifications.addListener(
    //   "pushNotificationReceived",
    //   (notification: PushNotificationSchema) => {
    //     setnotifications((notifications) => [
    //       ...notifications,
    //       {
    //         id: notification.id,
    //         title: notification.title,
    //         body: notification.body,
    //         type: "foreground",
    //       },
    //     ]);
    //   }
    // );

    // Method called when tapping on a notification

    // PushNotifications.addListener(
    //   "pushNotificationActionPerformed",
    //   (notification: ActionPerformed) => {
    //     setnotifications((notifications) => [
    //       ...notifications,
    //       {
    //         id: notification.notification.data.id,
    //         title: notification.notification.data.title,
    //         body: notification.notification.data.body,
    //         type: "action",
    //       },
    //     ]);
    //   }
    // );
  };

  return <></>;
};

export default PushNotificationsContainer;
