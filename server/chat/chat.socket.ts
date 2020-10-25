import { ChatModel } from "../models/chat.model";


export function initSocket(socket: any) {
    console.log("Initializing connection")
    socket.on('setUser', (data: { userId: string }) => setUser(socket, data));
    socket.on('send', (data: { from: string, to: string, value: string }) => send(socket, data));
}

function setUser(socket: any, data: { userId: string }) {
    socket.join(data.userId)
}

async function send(socket: any, data: { from: string, to: string, value: string }) {
    try {
        const text = {
            from: data.from,
            date: new Date(),
            value: data.value
        }
        await ChatModel.updateOne({
            '$or': [
                { 'user1': data.from, 'user2': data.to },
                { 'user2': data.from, 'user1': data.to }
            ]
        }, { $push: { 'texts': text } })
        socket.to(data.to).emit('receive', data)
    } catch (error) {
        console.error(error);
    }
}

// await ChatModel.update(
//     { 
//         '_id': roomId,
//         '$or': [
//             {
//                 'brand': from,
//                 'channel': to
//             },
//             {
//                 'brand': to,
//                 'channel': from
//             }
//         ]
//     },
//     { $push: { 'texts': text } }
// );