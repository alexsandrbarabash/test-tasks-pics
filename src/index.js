const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const RSS = require('rss');

const jobService = require('./job-service.service');
const { Job } = require('./schemas');

require('dotenv').config();

const feed = new RSS({ title: 'Job' });

const app = express();
// const port = 3000;

app.use(express.json());

app.get('/templates', async (_, res) => {
  const templates = await jobService.getAll();
  res.json(templates);
});

app.post('/templates/:templateId/job', async (req, res) => {
  try {
    const result = await jobService.execute(req.params.templateId, req.body);
    const job = new Job();
    job.name = req.params.templateId;
    job.result = result;
    await job.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      message: `Something wrong. Error ${error.message}, Stack: ${error.stack}`,
    });
  }
});

app.get('/health', (_, res) => {
  res.json({ cpus: os.cpus(), totalmem: os.totalmem(), freemem: os.freemem() });
});

app.get('/rss', async (_, res) => {
  const data = await Job.find();

  data.forEach((item) => {
    console.log({ title: item.name, description: item.result });
    feed.item({ title: item.name, description: item.result });
  });
  res.set('Content-Type', 'text/xml');
  res.send(feed.xml());
});

const port = process.env.PORT;

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`Server start at ${port}`);
});
