const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.query.createMany({
        data: [
            { question: "Hello", answer: "Hello! How can I assist you today?" },
            { question: "How are you?", answer: "I'm doing great, thanks for asking! How can I help you?" },
            { question: "What's your name?", answer: "You can call me your friendly chatbot assistant!" },
            { question: "What can you do?", answer: "I can answer your questions, provide information, and help you out!" },
            { question: "Can I ask you a question?", answer: "Yes sure! Just make sure to enable AI option so that you will get response for every question." },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
