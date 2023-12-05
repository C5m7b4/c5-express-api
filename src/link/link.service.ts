import { db } from "../utils/db.server";

export type Link = {
  //departmentId: number;
  categoryId: number | null;
  productId: number;
};

export type LinkUpdate = {
  id: number;
  departmentId: number;
  categoryId: number | null;
  productId: number;
};

export const getLinks = async (): Promise<Link[]> => {
  return db.link.findMany({
    select: {
      id: true,
      departmentId: true,
      categoryId: true,
      productId: true,
    },
  });
};

export const getLinkById = async (id: number): Promise<Link | null> => {
  return db.link.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      productId: true,
      categoryId: true,
      departmentId: true,
    },
  });
};

export const createLink = async (link: LinkUpdate): Promise<Link> => {
  const { departmentId, categoryId, productId } = link;
  return db.link.create({
    data: {
      departmentId,
      categoryId,
      productId,
    },
    select: {
      productId: true,
      departmentId: true,
      categoryId: true,
    },
  });
};

export const updateLink = async (
  link: LinkUpdate,
  id: number,
): Promise<Link> => {
  const { departmentId, categoryId, productId } = link;
  return db.link.update({
    where: {
      id,
    },
    data: {
      departmentId,
      categoryId,
      productId,
    },
    select: {
      productId: true,
      departmentId: true,
      categoryId: true,
    },
  });
};

export const deleteLink = async (id: number): Promise<void> => {
  await db.link.delete({
    where: {
      id,
    },
  });
};
