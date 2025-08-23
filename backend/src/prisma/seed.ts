import { prisma } from "./index";

async function main() {
  // Seed Admins
  await prisma.staff.createMany({
    data: [
      {
        name: "John",
        email: "john@zoo.com",
        password: "123456",
      },
      {
        name: "Bob",
        email: "bob@zoo.com",
        password: "123456",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Animals
  await prisma.animal.createMany({
    data: [
      {
        name: "Leo",
        species: "Lion",
        age: 8,
        gender: "Male",
        health_status: "Healthy",
      },
      {
        name: "Nala",
        species: "Lion",
        age: 7,
        gender: "Female",
        health_status: "Injured",
      },
      {
        name: "Ella",
        species: "Elephant",
        age: 25,
        gender: "Female",
        health_status: "Healthy",
      },
      {
        name: "Max",
        species: "Elephant",
        age: 30,
        gender: "Male",
        health_status: "Sick",
      },
      {
        name: "Kiki",
        species: "Giraffe",
        age: 12,
        gender: "Female",
        health_status: "Recovering",
      },
      {
        name: "Sam",
        species: "Giraffe",
        age: 10,
        gender: "Male",
        health_status: "Recovering", 
      },
      {
        name: "Rocky",
        species: "Tiger",
        age: 6,
        gender: "Male",
        health_status: "Critical",
      },
      {
        name: "Maya",
        species: "Tiger",
        age: 5,
        gender: "Female",
        health_status: "UnderTreatment",
      },
      {
        name: "Coco",
        species: "Monkey",
        age: 3,
        gender: "Female",
        health_status: "Healthy", 
      },
      {
        name: "Charlie",
        species: "Monkey",
        age: 4,
        gender: "Male",
        health_status: "Sick", 
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("✅ Seed data inserted successfully");
  })
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
