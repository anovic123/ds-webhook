const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { SETTINGS } = require("./settings.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('No message content');
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${SETTINGS.OPENAI_API_KEY}`,
                },
            },
        );

        const reply = response.data.choices[0].message.content;

        await axios.post(SETTINGS.DISCORD_WEBHOOK_URL, {
            content: reply,
        });

        res.status(200).send('Message processed');
    } catch (error) {
        console.error(error?.response?.data || error?.message);
        res.status(500).send('Error processing message');
    }
});

app.get('/', (req, res) => {
  res.json('Server is started');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
