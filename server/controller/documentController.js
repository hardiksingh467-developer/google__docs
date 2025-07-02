import Document from "../schemas/documentSchema.js";

export const createDocument = async (id) => {

  if (id === null) return;

  let document;

  document = await Document.findById(id);

  if (document) return;

  document = await Document.create({ _id: id, data: "" });

  return document;
};

export const getDocument = async (id) => {
  if (id === null) return;

  const document = await Document.findById(id);

  return document;
};

export const updateDocument = async (id, data) => {

  if (id === null) return;

  let document;
  document = Document.findById(id);

  if (!document) return;
  document =  await Document.findByIdAndUpdate(id, { data });

  return document;
};
