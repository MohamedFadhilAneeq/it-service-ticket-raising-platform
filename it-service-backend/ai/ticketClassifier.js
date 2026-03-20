const natural = require("natural");
const fs = require("fs");
const csv = require("csv-parser");

const classifier = new natural.BayesClassifier();
const tokenizer = new natural.WordTokenizer();

/* ---------- Stopwords ---------- */

const stopwords = [
  "is","not","on","the","a","to","of","and","for",
  "my","in","with","from","at","by","this","that","it","be","are"
];

/* ---------- Preprocess Text ---------- */

function preprocess(text) {

  if (!text || typeof text !== "string") return [];

  return tokenizer
    .tokenize(text.toLowerCase().trim())
    .filter(word => !stopwords.includes(word));

}

/* ---------- Train Classifier ---------- */

function trainClassifier() {

  return new Promise((resolve) => {

    fs.createReadStream("./dataset/tickets.csv")
      .pipe(csv())
      .on("data", (row) => {

        if (!row.issue || !row.category || !row.priority) return;

        const tokens = preprocess(row.issue);

        if (tokens.length === 0) return;

        const label = `${row.category}_${row.priority}`;

        classifier.addDocument(tokens, label);

      })
      .on("end", () => {

        classifier.train();

        console.log("AI model trained with category + priority");

        resolve();

      });

  });

}

/* ---------- Classify Issue ---------- */

function classifyIssue(issueText) {

  const tokens = preprocess(issueText);

  if (tokens.length === 0) {
    return {
      category: "Unclassified",
      priority: "Medium",
      confidence: 0
    };
  }

  let classifications = classifier.getClassifications(tokens);

  if (!classifications || classifications.length === 0) {
    return {
      category: "Unclassified",
      priority: "Medium",
      confidence: 0
    };
  }

  /* Sort highest probability */
  classifications.sort((a, b) => b.value - a.value);

  const topResult = classifications[0];

  /* Normalize confidence */
  const total = classifications.reduce((sum, c) => sum + c.value, 0);

  const confidence = Math.round((topResult.value / total) * 100);

  /* Split category and priority */
  const [category, priority] = topResult.label.split("_");

  return {
    category,
    priority,
    confidence
  };

}

module.exports = { trainClassifier, classifyIssue };