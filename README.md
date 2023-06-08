# Event Push Notification Control Panel

This is a ReactJS-based control panel that uses the JotForm API to receive push notifications and broadcast them to all users watching a live stream. This Readme provides a guide to the control panel's functionality and features.
Below is an example of a livestream that is setup to recieve live notifications.


#### Sending the notification via the admin panel
![pn gif 2](https://github.com/joshem96/pushnotification-app/assets/31944980/70f58d66-361b-41a9-858a-e1f617b40820)
#### The user recieving the notification on their device
![pn gif](https://github.com/joshem96/pushnotification-app/assets/31944980/af479bcc-cb4b-472c-b66d-26e049fc4118)

## Table of Contents

- [Manage Live Notifications](#manage-live-notifications)
- [API Testing](#api-testing)
- [API Usage Log](#api-usage-log)
- [Push Notification Window](#push-notification-window)

## Manage Live Notifications

In this window, you can manage your live notifications. Here you can find the "Send Message" and "Delete Notifications" buttons. The "Send Message" button opens a pop-up window where you can send messages. The "Delete Notifications" button deletes all previous push notifications, so late attendees won't be bombarded with a bunch of notifications from earlier in the morning. We recommend pressing this button about 10 minutes after a push notification has been sent (we plan to make this automtic in a future version).
### Note: 
there is a slight bug where when the delete notifications button is pressed the site must be refreshed otherwise information presented in the control panel may not be true, this does not affect the end user.

## API Testing

In this window, you will find a string for the last push notification you sent. The current API status is also displayed, so if you've deleted messages, it will reflect that here, and if you've just received a notification, that will also be reflected here. 

There are two buttons here: "Start Searching" and "Stop Searching." The "Start Searching" button allows you to start searching for new messages and emulates the experience of the user/client. The "Stop Searching" button stops this functionality. The main use here is so you don't have it constantly searching and saving API calls.

## API Usage Log

In this window, you can view a log of the current API status call quota. [See what each response means under the sample response example](https://api.jotform.com/docs/#user-usage). There is a refresh button so you can refresh the current data limit.

## Push Notification Window

In this window, you will see the push notification. This is basically where your emulated experience of the user will reside. Although it has added functionality where you can edit the text upon click, for testing purposes (if you wish to see what the message looks like longer, etc.). This does not affect the user whatsoever.

## Conclusion

That's all for the Event Push Notification Control Panel! We hope you find it useful and easy to use. If you have any feedback or suggestions, please let us know!
