import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, apiValidationError } from "@/lib/api-response";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = registerSchema.safeParse(body);

  if (!parsedBody.success) {
    return apiValidationError(parsedBody.error);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: parsedBody.data.email }, { phone: parsedBody.data.phone }],
    },
  });

  if (existingUser) {
    return apiError("An account with that email or phone already exists.", 409);
  }

  const passwordHash = await hashPassword(parsedBody.data.password);

  const user = await prisma.user.create({
    data: {
      name: parsedBody.data.fullName,
      email: parsedBody.data.email,
      phone: parsedBody.data.phone,
      passwordHash,
      role: Role.STUDENT,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return apiSuccess(
    {
      message: "Student account created successfully.",
      user,
    },
    { status: 201 },
  );
}
