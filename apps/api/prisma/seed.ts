import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'ardiansyah@sibolajuara.id' },
    update: {},
    create: {
      name: 'Ardiansyah Putra',
      email: 'ardiansyah@sibolajuara.id',
      phone: '+62 812 0000 0000',
      passwordHash,
      avatarUrl: 'https://i.pravatar.cc/200?img=12',
      membership: 'pro',
      points: 1250,
    },
  });

  await prisma.field.createMany({
    data: [
      {
        id: 'fld_victory',
        name: 'Victory Arena',
        address: 'Jl. Pahlawan No. 45, Jakarta Selatan',
        distanceKm: 1.2,
        rating: 4.8,
        reviews: 120,
        pricePerHour: 200_000,
        imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200',
        facilities: 'Parking,Lighting,Toilet,Cafe,Locker',
        openHour: '06:00',
        closeHour: '24:00',
        latitude: -6.2615,
        longitude: 106.8106,
      },
      {
        id: 'fld_east',
        name: 'The East Field',
        address: 'Jl. Casablanca Raya No. 8, Jakarta Selatan',
        distanceKm: 2.4,
        rating: 4.6,
        reviews: 88,
        pricePerHour: 150_000,
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200',
        facilities: 'Parking,Toilet,Locker',
        openHour: '06:00',
        closeHour: '23:00',
        latitude: -6.2255,
        longitude: 106.8451,
      },
      {
        id: 'fld_tebet',
        name: 'Tebet Football Ground',
        address: 'Jl. Tebet Raya No. 21, Jakarta Selatan',
        distanceKm: 3.1,
        rating: 4.5,
        reviews: 65,
        pricePerHour: 150_000,
        imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200',
        facilities: 'Parking,Lighting,Toilet',
        openHour: '07:00',
        closeHour: '22:00',
        latitude: -6.2347,
        longitude: 106.8531,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.team.createMany({
    data: [
      { id: 'tm_vikings', name: 'Vikings FC', memberCount: 12 },
      { id: 'tm_glory', name: 'Glory United', memberCount: 14 },
      { id: 'tm_tebet', name: 'Tebet Warriors', memberCount: 10 },
      { id: 'tm_forest', name: 'Forest Legion', memberCount: 11 },
    ],
    skipDuplicates: true,
  });

  console.log('Seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
