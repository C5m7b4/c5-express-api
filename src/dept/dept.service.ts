import { db } from "../utils/db.server";

export type Department = {
  id: number;
  description: string;
};

export const getDepartments = async (): Promise<Department[]> => {
  return db.department.findMany({
    select: {
      id: true,
      description: true,
    },
  });
};

export const getDepartmentById = async (
  id: number,
): Promise<Department | null> => {
  return db.department.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
    },
  });
};

export const createDepartment = async (
  dept: Department,
): Promise<Department> => {
  const { id, description } = dept;
  return db.department.create({
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

export const updateDepartment = async (
  dept: Department,
  id: number,
): Promise<Department> => {
  const { description } = dept;
  return db.department.update({
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

export const deleteDepartment = async (id: number): Promise<void> => {
  await db.department.delete({
    where: {
      id,
    },
  });
};
