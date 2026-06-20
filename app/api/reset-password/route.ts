import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, apiValidationError } from "@/lib/api-response";
import { hashPassword } from "@/lib/password";
import { hashToken } from "@/lib/tokens";
import { resetPasswordSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = resetPasswordSchema.safeParse(body);

  if (!parsedBody.success) {
    return apiValidationError(parsedBody.error);
  }

  const tokenHash = hashToken(parsedBody.data.token);
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
  });

  if (!passwordResetToken) {
    return apiError("Reset token is invalid.", 400);
  }

  if (passwordResetToken.usedAt) {
    return apiError("Reset token has already been used.", 400);
  }

  if (passwordResetToken.expiresAt.getTime() < Date.now()) {
    return apiError("Reset token has expired.", 400);
  }

  const passwordHash = await hashPassword(parsedBody.data.password);

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        passwordHash,
      },
    }),
    prisma.passwordResetToken.update({
      where: {
        tokenHash,
      },
      data: {
        usedAt: new Date(),
      },
    }),
  ]);

  return apiSuccess({
    message: "Password reset successful.",
  });
}
