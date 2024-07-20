const Message = require("../models/messageModel");


async function addMsg(req, res, next) {
    try {
        const { from, to, message } = req.body;

        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });


        if (!data) {
            return res.status(500).json({ message: "Failed to add message" });
        }

        return res.status(200).json({ message: "Message added successfully" });
    } catch (error) {
        next(error);
    }
};

async function getAllMsgs(req, res, next) {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({ users: { $all: [from, to] } }).sort({ updated: 1 });
        const projectMessages = messages.map((msg) => {

            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.status(200).json(projectMessages);
    } catch (error) {
        next(error);
    }
}
;
module.exports = {
    addMsg,
    getAllMsgs
};