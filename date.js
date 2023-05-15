module.exports = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date()
    .toLocaleDateString("en-US", options)
    .replace(",", "");
  return today;
};
