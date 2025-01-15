import { prisma } from '@/lib/prisma';
import { PrismaClient, PET_AGE, PET_SIZE, PET_LEVEL_INDEPENDENCE, PET_LEVEL_ENVIRONMENT } from '@prisma/client';



async function main() {
  // Criação de uma organização para vincular os pets
  const organization = await prisma.organization.create({
    data: {
      manager_name: "John Doe",
      email: "org@example.com",
      phone: "123456789",
      password_hash: "hashed_password",
      roadway: "Main St.",
      number: "123",
      neighborhood: "Downtown",
      city: "Sample City",
      state: "Sample State",
    },
  });

  // Dados dos pets
  const petsData = [
    {
      name: "Buddy",
      about: "A friendly and playful dog.",
      age: PET_AGE.FILHOTE,
      size: PET_SIZE.PEQUENO,
      level_independence: PET_LEVEL_INDEPENDENCE.MEDIO,
      level_environment: PET_LEVEL_ENVIRONMENT.BAIXO,
      image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnI33utT_AfatFvwqr9LLt599wJoIriqyIw&s"],
      requirement: ["Daily walks"],
    },
    {
      name: "Luna",
      about: "A calm and loving cat.",
      age: PET_AGE.ADULTO,
      size: PET_SIZE.PEQUENO,
      level_independence: PET_LEVEL_INDEPENDENCE.ALTO,
      level_environment: PET_LEVEL_ENVIRONMENT.MEDIO,
      image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjtOYuK2n_CZoxQs9zxK96N1_qMiv3ZWSYQ&s"],
      requirement: ["Litter box"],
    },
    {
      name: "Max",
      about: "An energetic and loyal companion.",
      age: PET_AGE.ADULTO,
      size: PET_SIZE.MEDIO,
      level_independence: PET_LEVEL_INDEPENDENCE.BAIXO,
      level_environment: PET_LEVEL_ENVIRONMENT.ALTO,
      image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSn-7DOfURfIh0XuvMaoZgimCq5h9Ght2zKw&s"],
      requirement: ["Large yard"],
    },
    {
      name: "Bella",
      about: "A gentle and affectionate dog.",
      age: PET_AGE.IDOSO,
      size: PET_SIZE.GRANDE,
      level_independence: PET_LEVEL_INDEPENDENCE.MEDIO,
      level_environment: PET_LEVEL_ENVIRONMENT.BAIXO,
      image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOPwcpFc5zPDO_JY_w4CM1QuhBoe40jNyMrg&s"],
      requirement: ["Soft bed"],
    },
    {
      name: "Charlie",
      about: "A smart and curious parrot.",
      age: PET_AGE.FILHOTE,
      size: PET_SIZE.PEQUENO,
      level_independence: PET_LEVEL_INDEPENDENCE.ALTO,
      level_environment: PET_LEVEL_ENVIRONMENT.MEDIO,
      image_url: ["https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg"],
      requirement: ["Spacious cage"],
    },
  ];

  // Criação dos pets vinculados à organização
  for (const petData of petsData) {
    await prisma.pet.create({
      data: {
        ...petData,
        organization_id: organization.id,
      },
    });
  }

  console.log("Seed completed: 5 pets created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
