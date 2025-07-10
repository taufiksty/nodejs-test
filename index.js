const express = require('express');
const os = require('os');
const fs = require('fs');

const app = express();
const port = 80;

// Read EC2 metadata (instance-id)
let instanceId = 'unknown';
try {
  instanceId = fs.readFileSync('/var/lib/cloud/data/instance-id', 'utf-8');
} catch (e) {
  instanceId = os.hostname(); // fallback
}

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from EC2',
    instanceId: instanceId.trim(),
    hostname: os.hostname(),
    ip: req.socket.localAddress
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
