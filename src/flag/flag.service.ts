import { db } from "../utils/db.server";

export type Flag = {
  id: number;
  productId: number;
  tax1: number;
  tax2: number;
  tax3: number;
  tax4: number;
  fs: number;
  wic: number;
};

export const getFlags = async (): Promise<Flag[]> => {
  return db.flag.findMany({
    select: {
      id: true,
      productId: true,
      tax1: true,
      tax2: true,
      tax3: true,
      tax4: true,
      fs: true,
      wic: true,
    },
  });
};

export const getFlagById = async (id: number): Promise<Flag | null> => {
  return db.flag.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      productId: true,
      tax1: true,
      tax2: true,
      tax3: true,
      tax4: true,
      fs: true,
      wic: true,
    },
  });
};

export const createFlag = async (flag: Flag): Promise<Flag> => {
  const { productId, tax1, tax2, tax3, tax4, fs, wic } = flag;
  return db.flag.create({
    data: {
      productId,
      tax1,
      tax2,
      tax3,
      tax4,
      fs,
      wic,
    },
    select: {
      id: true,
      productId: true,
      tax1: true,
      tax2: true,
      tax3: true,
      tax4: true,
      fs: true,
      wic: true,
    },
  });
};

export const updateFlag = async (flag: Flag, id: number): Promise<Flag> => {
  const { productId, tax1, tax2, tax3, tax4, fs, wic } = flag;
  return db.flag.update({
    where: {
      id,
    },
    data: {
      productId,
      tax1,
      tax2,
      tax3,
      tax4,
      fs,
      wic,
    },
    select: {
      id: true,
      productId: true,
      tax1: true,
      tax2: true,
      tax3: true,
      tax4: true,
      fs: true,
      wic: true,
    },
  });
};

export const deleteFlag = async (id: number) => {
  await db.flag.delete({
    where: {
      id,
    },
  });
};
