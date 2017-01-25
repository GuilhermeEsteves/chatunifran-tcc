module.exports = {
    name: "talk",
    funcionalidade: 'talk',
    schema: {
        users: [Number],
        messages: [{
            user: Number,
            text: String,
            dataEnvio: { type: Date, default: Date.now },
            read: {type: Boolean, default: false}
        }]
    }
};