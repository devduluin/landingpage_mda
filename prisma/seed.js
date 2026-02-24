const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('MD4P4$$word', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mda.com' },
    update: {},
    create: {
      email: 'admin@mda.com',
      name: 'Admin MDA',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created:', { email: adminUser.email });
  console.log('   Email: admin@mda.com');
  console.log('   Password: MD4P4$$word');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
