const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  console.log(req.user);
  const result = await Categories.find({ organizer: req.user.organizer });
  return result;
};
const createCategories = async (req) => {
  const { name } = req.body;
  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("kategori nama duplikat");
  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });
  return result;
};
const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);
  return result;
};
const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequestError("kategori nama duplikat");
  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByIdAndDelete({
    id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  checkingCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
};
