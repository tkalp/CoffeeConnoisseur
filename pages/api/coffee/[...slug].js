export default function handler(req, res) {
  res.status(200).json({
    name: "Hi Slug",
    age: 100,
    hair: "black",
    family: "Stark/Targayean",
  });
}
