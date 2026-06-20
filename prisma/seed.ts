import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = process.env.SEED_SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SEED_SUPER_ADMIN_PASSWORD;
  const superAdminName = process.env.SEED_SUPER_ADMIN_NAME ?? "Toodle Super Admin";
  const superAdminPhone = process.env.SEED_SUPER_ADMIN_PHONE ?? "+920000000000";

  if (superAdminEmail && superAdminPassword) {
    const passwordHash = await hashPassword(superAdminPassword);

    await prisma.user.upsert({
      where: {
        email: superAdminEmail.toLowerCase(),
      },
      update: {
        name: superAdminName,
        phone: superAdminPhone,
        passwordHash,
        role: Role.SUPER_ADMIN,
      },
      create: {
        email: superAdminEmail.toLowerCase(),
        name: superAdminName,
        phone: superAdminPhone,
        passwordHash,
        role: Role.SUPER_ADMIN,
      },
    });
  }

  const plans = [
    {
      name: "Monthly Plan",
      durationLabel: "30 Days",
      durationDays: 30,
      price: "5000.00",
      description: "A flexible monthly plan for active students.",
    },
    {
      name: "Quarterly Plan",
      durationLabel: "90 Days",
      durationDays: 90,
      price: "13500.00",
      description: "A longer study rhythm with better value.",
    },
  ];

  for (const plan of plans) {
    await prisma.membershipPlan.upsert({
      where: {
        name: plan.name,
      },
      update: {
        durationLabel: plan.durationLabel,
        durationDays: plan.durationDays,
        price: plan.price,
        description: plan.description,
        currency: "PKR",
        isActive: true,
      },
      create: {
        ...plan,
        currency: "PKR",
        isActive: true,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
