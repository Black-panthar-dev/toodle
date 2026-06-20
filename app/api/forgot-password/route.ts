import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess, apiValidationError } from "@/lib/api-response";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { createRawToken, hashToken } from "@/lib/tokens";
import { forgotPasswordSchema } from "@/lib/validations/auth";

const RESET_TOKEN_TTL_MINUTES = 30;

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = forgotPasswordSchema.safeParse(body);

  if (!parsedBody.success) {
    return apiValidationError(parsedBody.error);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (!user) {
    return apiSuccess({
      message: "If the account exists, a reset email has been sent.",
    });
  }

  const rawToken = createRawToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  const url = new URL("/reset-password", request.url);
  url.searchParams.set("token", rawToken);

  try {
    await sendPasswordResetEmail({
      name: user.name ?? null,
      resetUrl: url.toString(),
      to: parsedBody.data.email,
    });
  } catch (error) {
    console.error(error);
    return apiError("Unable to send reset email right now.", 500);
  }

  return apiSuccess({
    message: "If the account exists, a reset email has been sent.",
  });
}
