import prisma from '@lib/prisma';

export async function selectUser() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    return new Response(JSON.stringify(users), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function createUser(req) {
  const { name, email } = await req.json();
  const user = await prisma.user.create({
    data: { name, email },
  });
  return new Response(JSON.stringify(user), { status: 201 });
}

export async function deleteUser(req) {
  const { id } = await req.json();
  await prisma.user.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}

export async function updateUser(req) {
  const { id, name, email } = await req.json();
  const user = await prisma.user.update({
    where: { id },
    data: { name, email },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
