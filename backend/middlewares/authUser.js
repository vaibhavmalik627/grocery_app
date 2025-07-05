const authUser = async (req, res, next) => {
  // For simpler authentication, assume user ID is sent in a custom header "x-user-id"
  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  req.user = userId;
  next();
};

export default authUser;
