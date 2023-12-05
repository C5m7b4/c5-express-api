import { db } from "../utils/db.server";

export type Category = {
  id: number;
  description: string;
};

export const getCategories = async (): Promise<Category[]> => {
  return db.category.findMany({
    select: {
      id: true,
      description: true,
    },
  });
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  return db.category.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
    },
  });
};

export const createCategory = async (category: Category): Promise<Category> => {
  const { id, description } = category;
  return db.category.create({
    data: {
      id,
      description,
    },
    select: {
      id: true,
      description: true,
    },
  });
};

export const updateCategory = async (
  category: Category,
  id: number,
): Promise<Category> => {
  const { description } = category;
  return db.category.update({
    where: {
      id,
    },
    data: {
      id,
      description,
    },
    select: {
      id: true,
      description: true,
    },
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  await db.category.delete({
    where: {
      id,
    },
  });
};
