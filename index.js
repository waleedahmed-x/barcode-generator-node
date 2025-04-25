// app.get("/barcode", (req, res) => {
//     const { text } = req.query;

//     if (!text) return res.status(400).send("Missing 'text' query param");

//     bwipjs.toBuffer(
//       {
//         bcid: "code128",
//         text: text,
//         scale: 3,
//         height: 10,
//         includetext: true,
//         textxalign: "center",
//       },
//       (err, png) => {
//         if (err) {
//           res.status(500).send("Error generating barcode");
//         } else {
//           res.set("Content-Type", "image/png");
//           res.send(png);
//         }
//       }
//     );
//   });
// ! QUERY PARAM ONE
const express = require("express");
const bwipjs = require("bwip-js");
const readline = require("readline");

const app = express();

// Setup terminal prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter the product code or URL to encode in the barcode: ",
  (barcodeText) => {
    rl.close();

    if (!barcodeText) {
      console.log("❌ No input provided. Exiting.");
      process.exit(1);
    }

    app.get("/barcode", (req, res) => {
      bwipjs.toBuffer(
        {
          bcid: "code128", // Barcode type
          text: barcodeText, // Terminal input
          scale: 3,
          height: 10,
          includetext: true,
          textxalign: "center",
        },
        (err, png) => {
          if (err) {
            console.error("Error generating barcode:", err);
            res.status(500).send("Error generating barcode");
          } else {
            res.set("Content-Type", "image/png");
            res.send(png);
          }
        }
      );
    });

    app.listen(3000, () => {
      console.log(`✅ Server running at http://localhost:3000/barcode`);
      console.log(`📦 Barcode for: ${barcodeText}`);
    });
  }
);
// ! TERNIMAL INPUT
