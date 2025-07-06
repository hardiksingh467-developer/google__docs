import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { Server } from "socket.io";

// import DB connection
// import { Connection } from "./database/db.js";
import Connection from "./database/db.js";

// import controllers
import {
  getDocument,
  createDocument,
  updateDocument,
  // deleteDocument
} from "./controller/documentController.js";

const app = express();

// configuring incomming HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

Connection(); // connect to database

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("Server running on port " + PORT);
});

app.get("/ping-render", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Render pinged",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  path: "/api/v1/signalling/socket", // very important
  cors: {
    origin: "*", // Adjust for prod
    methods: ["GET", "POST"],
    // this should work
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected ", socket.id);

  socket.on("get-document", async (id) => {
    socket.join(id);
    const data = "";
    let document;
    document = await getDocument(id);
    console.log("get-document id is ", id);
    console.log("get-document document is ", document);
    if (!document) {
      document = await createDocument(id);
      console.log("Created document is ", document);
    }
    console.log("here");
    console.log("here", document);
    // socket.emit("load-document", document.data);
    socket.emit("load-document", document);
  });

  socket.on("send-changes", async ({ id, delta }) => {
    console.log("incomming id ", id);
    console.log("incomming delta ", delta);
    socket.broadcast.to(id).emit("receive-changes", delta);
  });

  socket.on("save-document", async ({ id, delta }) => {
    console.log("save-document id is ", id);
    console.log("save-document delta is ", delta);
    await updateDocument(id, delta);
  });

  socket.on("disconnect", async () => {
    console.log("Socket disconnected ", socket.id);
    // console.clear();
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
