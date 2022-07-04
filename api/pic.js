import express from "express";
let router = express.Router();

import { client } from "../aws";
const tableName = "pic";
/**
 * GET: /pics get picList
 */
router.get("/", (req, res) => {
  client
    .scan({
      TableName: tableName,
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * GET: /user/:picId getPic
 * @param id picId
 */
router.get("/:id", (req, res) => {
  // picId check
  client
    .get({
      TableName: tableName,
      Key: {
        id: req.params.id,
      },
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * POST: /pic add pic
 * @param {req.body} { id: id, size: 文件大小, name: 文件名, path: 文件路径 }
 */
router.post("/addPic", (req, res) => {
  client
    .put({
      TableName: tableName,
      Item: req.body,
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

module.exports = router;
