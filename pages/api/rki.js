export default function rkiHandler(req, res) {
  console.log("@TODO: SAVE", req.body);

  res.json({
    success: true,
    body: req.body,
  });
}
