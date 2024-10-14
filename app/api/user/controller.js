import prisma from '@lib/prisma';
import { handleErrors } from '@helpers/errorHandlers';


export const selectUser = handleErrors(async () => {
  const users = await prisma.user.findMany();

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

export const createUser = handleErrors(async (req) => {
  const { name, email } = await req.json();

  const createUser = await prisma.user.create({
    data: { name, email },
  });
  
  return new Response(JSON.stringify(createUser), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

export const deleteUser = handleErrors(async (req) => {
  const { id } = await req.json();
  
  await prisma.user.delete({
    where: { id },
  });
  
  return new Response(null, {
    status: 204,
    headers: { 'Content-Type': 'application/json' },
  });
});

export const updateUser = handleErrors(async (req) => {
  const { id, name, email } = await req.json();

  const updateUser = await prisma.user.update({
    where: { id },
    data: { name, email },
  });
  
  return new Response(updateUser, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});