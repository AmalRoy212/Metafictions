export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser.userId ? users[1].name : users[0].name;
};

export const getSenderImg = (loggedUser, users) => {
  return users[0]._id === loggedUser.userId ? users[1].imgSrc : users[0].imgSrc;
}