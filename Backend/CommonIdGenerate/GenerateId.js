const Counter = require("../models/Counter");

const generateId = async (type) => {
  // Counter-ஐ அப்டேட் செய்து புதிய seq-ஐப் பெறுக
  const counter = await Counter.findOneAndUpdate(
    { id: type },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const currentYearLast2 = currentYear.toString().slice(-2);
  const nextYearLast2 = nextYear.toString().slice(-2);

  // *** முக்கியமான பகுதி: seqFormatted-ஐ இங்கே வரையறுக்கவும் ***
  const seqFormatted = String(counter.seq).padStart(4, "0");

  // பயனர் ஐடி
  if (type === "user_id") {
    return `FHUSR${currentYearLast2}${nextYearLast2}-${seqFormatted}`;
  }

  // விசாரணை ஐடி (3 இலக்கங்கள்)
  if (type === "enquire_id") {
    return `ENQ-${String(counter.seq).padStart(3, "0")}`;
  }

  // சந்திப்பு ஐடி (3 இலக்கங்கள்) – 'appointment' என்பதில் எழுத்துப் பிழை உள்ளது, தேவையெனில் சரிசெய்யவும்
  if (type === "appoinmnet_id") {
    return `APP-${String(counter.seq).padStart(3, "0")}`;
  }

  // சான்றிதழ் ஐடி
  if (type === "test_id") {
    return `TEST-${seqFormatted}`;
  }

  // மற்ற அனைத்து வகைகளுக்கும் பொதுவான வடிவம்
  return `${type}-${seqFormatted}`;
};

module.exports = generateId;