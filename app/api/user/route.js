import { selectUser, createUser, deleteUser, updateUser } from './controller';


export async function GET() {
  return selectUser();
}

export async function POST(req) {
  return createUser(req);
}

export async function DELETE(req) {
  return deleteUser(req);
}

export async function PUT(req) {
  return updateUser(req);
}
