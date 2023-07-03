import asyncHandler from "express-async-handler";
import moment from 'moment';
import NotificationModel from "../models/notificationsModel.js";
import UserModel from "../models/userModel.js";

const findNotifications = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const user = await UserModel.findById(_id);
  const userNotification = user.notifications;

  const notifications = await NotificationModel.find({ _id: { $in: userNotification }, isDeleted : false });

  const updatedNotifications = await Promise.all(
    notifications.map(async (notification) => {
      const likedTime = moment(notification.dateOfNot);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(likedTime));
      const hoursAgo = Math.floor(duration.asHours());
      const minutesAgo = Math.floor(duration.asMinutes());

      let timeAgo;
      if (hoursAgo > 12) {
        timeAgo = likedTime.format('MMM D, YYYY');
      } else if (hoursAgo > 0 && hoursAgo < 12) {
        timeAgo = `${hoursAgo} hours ago`;
      } else if (hoursAgo < 12) {
        timeAgo = `${minutesAgo} minutes ago`;
      }

      return {
        ...notification.toObject(),
        date: timeAgo
      };
    })
  );

  updatedNotifications.reverse()

  if (updatedNotifications) {
    res.status(200).json(updatedNotifications);
  }
});


export  {
  findNotifications
}