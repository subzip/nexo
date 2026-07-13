import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});


async function main() {

    // Чистим старые данные
    await prisma.message.deleteMany();
    await prisma.chatParticipants.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.user.deleteMany();


    // =====================
    // USERS
    // =====================

    const subzip = await prisma.user.create({
        data: {
            username: "subzip",
            password: "123",
            avatar: "/avatar.svg",
        }
    });


    const diemiradie = await prisma.user.create({
        data: {
            username: "diemiradie",
            password: "123",
            avatar: "/avatar.svg",
        }
    });


    const tester = await prisma.user.create({
        data: {
            username: "tester",
            password: "123",
            avatar: "/avatar.svg",
        }
    });



    // =====================
    // CHAT 1
    // subzip <-> diemiradie
    // =====================

    const firstChat = await prisma.chat.create({
        data: {
            type: "direct",

            participants: {
                create: [
                    {
                        userId: subzip.id,
                        role: "owner",
                    },
                    {
                        userId: diemiradie.id,
                        role: "participant",
                    }
                ]
            },

            messages: {
                create: [
                    {
                        senderId: subzip.id,
                        text: "Привет, как дела?"
                    },
                    {
                        senderId: diemiradie.id,
                        text: "Привет! Все хорошо, а у тебя?"
                    },
                    {
                        senderId: subzip.id,
                        text: "Тоже нормально, делаю свой мессенджер"
                    },
                    {
                        senderId: diemiradie.id,
                        text: "Круто, покажешь потом?"
                    }
                ]
            }
        }
    });



    // =====================
    // CHAT 2
    // subzip <-> tester
    // =====================

    const secondChat = await prisma.chat.create({
        data: {
            type: "direct",

            participants: {
                create: [
                    {
                        userId: subzip.id,
                        role: "owner",
                    },
                    {
                        userId: tester.id,
                        role: "participant",
                    }
                ]
            },

            messages: {
                create: [
                    {
                        senderId: tester.id,
                        text: "Йо"
                    },
                    {
                        senderId: subzip.id,
                        text: "Привет"
                    },
                    {
                        senderId: tester.id,
                        text: "Как проект?"
                    },
                    {
                        senderId: subzip.id,
                        text: "Потихоньку пишу backend"
                    }
                ]
            }
        }
    });



    console.log("Seed completed");
    console.log({
        users: [
            subzip.username,
            diemiradie.username,
            tester.username
        ],
        chats: [
            firstChat.id,
            secondChat.id
        ]
    });
}



main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });