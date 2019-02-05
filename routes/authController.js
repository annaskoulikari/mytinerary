exports.google = (req, res) => {
  const io = req.app.get("io");
  const user = {
    email: req.user.email,
    userName: req.user.userName
  };
  io.in(req.session.socketId).emit("google", user);
  // res.end();
};
